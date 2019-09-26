import { get, map, uniqBy, uniq, flatten, filter } from "lodash"

import {
  REPOSITORY_NODE_KIND,
  TEAM_NODE_KIND,
  USER_NODE_KIND,
} from "../Graph/useSimulation"

import parseCodeOwners from "../../lib/parseCodeOwners"

const meaningfulTeam = ({ slug }) => {
  return !(
    RegExp("^thefork-developers$").test(slug) ||
    RegExp("^thefork-github-administrators$").test(slug)
  )
}

const toNodesAndLinks = ({ repositories, teams }) => {
  let nodes = []
  let links = []

  repositories.forEach(({ name: repositoryName, codeOwners, diskUsage }) => {
    if (codeOwners === null) return

    nodes.push({
      id: `${REPOSITORY_NODE_KIND}-${repositoryName}`,
      kind: REPOSITORY_NODE_KIND,
      name: repositoryName,
      size: diskUsage,
    })

    const { text } = codeOwners

    parseCodeOwners(text).forEach(({ kind, name: codeOwner }) => {
      if (kind === TEAM_NODE_KIND) {
        nodes.push({
          id: `${TEAM_NODE_KIND}-${codeOwner}`,
          kind: TEAM_NODE_KIND,
          name: codeOwner,
        })

        links.push({
          id: `${TEAM_NODE_KIND}-${codeOwner}-${REPOSITORY_NODE_KIND}-${repositoryName}`,
          source: `${TEAM_NODE_KIND}-${codeOwner}`,
          target: `${REPOSITORY_NODE_KIND}-${repositoryName}`,
        })
      } else {
        nodes.push({
          id: `${USER_NODE_KIND}-${codeOwner}`,
          kind: USER_NODE_KIND,
          name: codeOwner,
        })

        links.push({
          id: `${USER_NODE_KIND}-${codeOwner}-${REPOSITORY_NODE_KIND}-${repositoryName}`,
          source: `${USER_NODE_KIND}-${codeOwner}`,
          target: `${REPOSITORY_NODE_KIND}-${repositoryName}`,
        })
      }
    })
  })

  filter(teams, meaningfulTeam).forEach(({ slug: teamSlug, members = {} }) => {
    nodes.unshift({
      id: `${TEAM_NODE_KIND}-${teamSlug}`,
      kind: TEAM_NODE_KIND,
      name: teamSlug,
      size: get(members, "edges").length,
    })

    map(get(members, "edges"), "node").forEach(({ login }) => {
      nodes.push({
        id: `${USER_NODE_KIND}-${login}`,
        kind: USER_NODE_KIND,
        name: login,
      })

      links.push({
        id: `${USER_NODE_KIND}-${login}-${TEAM_NODE_KIND}-${teamSlug}`,
        source: `${USER_NODE_KIND}-${login}`,
        target: `${TEAM_NODE_KIND}-${teamSlug}`,
      })
    })
  })

  nodes = uniqBy(nodes, "id")
  links = uniqBy(links, ({ source, target }) => `${source}-${target}`)

  return {
    nodes,
    links,
  }
}

function withNodesAndLinks() {
  return Component => ({ repositoriesData, teamsData, ...otherProps }) => {
    const repositories = map(
      get(repositoriesData, "organization.repositories.edges", []),
      "node"
    )
    const teams = map(get(teamsData, "organization.teams.edges", []), "node")
    const { nodes, links } = toNodesAndLinks({
      repositories,
      teams,
    })

    return <Component {...{ nodes, links, ...otherProps }} />
  }
}

export default withNodesAndLinks()

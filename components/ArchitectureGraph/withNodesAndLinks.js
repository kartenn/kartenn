import {
  includes,
  mergeWith,
  isArray,
  get,
  map,
  flatten,
  compact,
  uniqBy,
  filter,
  values,
} from "lodash"

import {
  REPOSITORY_NODE_KIND,
  TEAM_NODE_KIND,
  USER_NODE_KIND,
} from "../Graph/useSimulation"

import parseFunctionalDependencies from "../../lib/parseFunctionalDependencies"
import parseDependenciesFromConfigFile from "./parseDependenciesFromConfigFile"

const nextGenRepositories = ({ name }) => {
  return (
    RegExp("-api$").test(name) ||
    RegExp("-gateway$").test(name) ||
    RegExp("-service$").test(name) ||
    RegExp("-worker$").test(name)
  )
}

export const SERVICE_LAYER = "service"
export const GATEWAY_LAYER = "gateway"
export const API_LAYER = "api"
export const WORKER_LAYER = "worker"

const repositoryLayer = ({ name }) => {
  if (RegExp("-api$").test(name)) return API_LAYER
  if (RegExp("-gateway$").test(name)) return GATEWAY_LAYER
  if (RegExp("-service$").test(name)) return SERVICE_LAYER
  if (RegExp("-worker$").test(name)) return WORKER_LAYER
}

const toNodesAndLinks = (data = {}) => {
  const repositories = filter(
    map(get(data, "organization.repositories.edges", []), "node"),
    nextGenRepositories
  )

  let nodes = {}
  let links = []

  repositories.forEach(
    ({
      name: repositoryName,
      url,
      markdownReadme,
      repositoryTopics,
      diskUsage,
      configDefault,
      installerLocal,
      installerDefault,
    }) => {
      nodes[`${REPOSITORY_NODE_KIND}-${repositoryName}`] = {
        ...nodes[`${REPOSITORY_NODE_KIND}-${repositoryName}`],
        id: `${REPOSITORY_NODE_KIND}-${repositoryName}`,
        kind: REPOSITORY_NODE_KIND,
        name: repositoryName,
        url,
        layer: repositoryLayer({ name: repositoryName, repositoryTopics }),
        size: diskUsage,
      }

      if (markdownReadme) {
        const { text: markdownReadmeText } = markdownReadme

        const functionalDependencies = parseFunctionalDependencies(
          markdownReadmeText
        )

        functionalDependencies.forEach(node => {
          const { summary: dependencyRepositoryName, content } = node

          nodes[`${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}`] = {
            // Fallback to 0 if the node is added as a dependency
            size: 0,
            ...nodes[`${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}`],
            id: `${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}`,
            kind: REPOSITORY_NODE_KIND,
            name: dependencyRepositoryName,
            url,
            layer: repositoryLayer({
              name: dependencyRepositoryName,
              repositoryTopics,
            }),
          }

          links.push({
            id: `${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}-${REPOSITORY_NODE_KIND}-${repositoryName}`,
            source: `${REPOSITORY_NODE_KIND}-${repositoryName}`,
            target: `${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}`,
            from: "readme",
          })
        })
      }

      const dependenciesFromConfigFiles = flatten(
        map(
          compact([configDefault, installerLocal, installerDefault]),
          "text"
        ).map(parseDependenciesFromConfigFile)
      )

      dependenciesFromConfigFiles.forEach(name => {
        nodes[`${REPOSITORY_NODE_KIND}-${name}`] = {
          // Fallback to 0 if the node is added as a dependency
          size: 0,
          ...nodes[`${REPOSITORY_NODE_KIND}-${name}`],
          id: `${REPOSITORY_NODE_KIND}-${name}`,
          kind: REPOSITORY_NODE_KIND,
          name: name,
          url,
          layer: repositoryLayer({
            name: name,
          }),
        }

        links.push({
          id: `${REPOSITORY_NODE_KIND}-${name}-${REPOSITORY_NODE_KIND}-${repositoryName}`,
          source: `${REPOSITORY_NODE_KIND}-${repositoryName}`,
          target: `${REPOSITORY_NODE_KIND}-${name}`,
          from: "config",
        })
      })
    }
  )

  nodes = values(nodes)
  links = uniqBy(links, ({ source, target }) => `${source}-${target}`)

  return {
    nodes,
    links,
  }
}

function withNodesAndLinks() {
  return Component => ({ data, ...otherProps }) => {
    const { nodes, links } = toNodesAndLinks(data)

    return <Component {...{ nodes, links, ...otherProps }} />
  }
}

export default withNodesAndLinks()

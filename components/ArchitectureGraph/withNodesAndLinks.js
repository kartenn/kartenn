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

import {SERVICE_LAYER, WORKER_LAYER, API_LAYER, GATEWAY_LAYER} from '../../constants/layers';

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
    (repo) => {
      nodes[`${REPOSITORY_NODE_KIND}-${repo.name}`] = {
        ...nodes[`${REPOSITORY_NODE_KIND}-${repo.name}`],
        id: `${REPOSITORY_NODE_KIND}-${repo.name}`,
        kind: REPOSITORY_NODE_KIND,
        name: repo.name,
        url: repo.url,
        layer: repositoryLayer({ name: repo.name, repositoryTopics: repo.repositoryTopics }),
        size: repo.diskUsage,
        ...repo
      };

      if (repo.markdownReadme) {
        const { text: markdownReadmeText } = repo.markdownReadme

        const functionalDependencies = parseFunctionalDependencies(
          markdownReadmeText
        );

        functionalDependencies.forEach(node => {
          const { summary: dependencyRepositoryName, content } = node;

          nodes[`${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}`] = {
            // Fallback to 0 if the node is added as a dependency
            size: 0,
            ...nodes[`${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}`],
            id: `${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}`,
            kind: REPOSITORY_NODE_KIND,
            name: dependencyRepositoryName,
            url: repo.url,
            layer: repositoryLayer({
              name: dependencyRepositoryName,
              repositoryTopics: repo.repositoryTopics,
            }),
          };

          links.push({
            id: `${REPOSITORY_NODE_KIND}-${dependencyRepositoryName}-${REPOSITORY_NODE_KIND}-${repo.name}`,
            source: `${REPOSITORY_NODE_KIND}-${repo.name}`,
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
      );

      dependenciesFromConfigFiles.forEach(name => {
        nodes[`${REPOSITORY_NODE_KIND}-${name}`] = {
          // Fallback to 0 if the node is added as a dependency
          size: 0,
          ...nodes[`${REPOSITORY_NODE_KIND}-${name}`],
          id: `${REPOSITORY_NODE_KIND}-${name}`,
          kind: REPOSITORY_NODE_KIND,
          name: name,
          url: repo.url,
          layer: repositoryLayer({
            name: name,
          }),
        }

        links.push({
          id: `${REPOSITORY_NODE_KIND}-${name}-${REPOSITORY_NODE_KIND}-${repo.name}`,
          source: `${REPOSITORY_NODE_KIND}-${repo.name}`,
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

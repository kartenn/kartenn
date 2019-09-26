import { mergeWith, isArray, get, map, flatten, uniqBy } from "lodash"

const toNodesAndLinks = data => {
  const { organization = {} } = data
  const { repositories = {} } = organization
  const { edges = [] } = repositories

  let nodes = []
  let links = []

  const REPOSITORY_KIND = "repository"
  const LANGUAGE_KIND = "language"

  edges.forEach(({ node: repository }) => {
    const { name: repositoryName, url, languages } = repository

    nodes.push({
      id: `${REPOSITORY_KIND}-${repositoryName}`,
      kind: REPOSITORY_KIND,
      name: repositoryName,
      url,
    })

    languages.edges.forEach(({ size, node: language }) => {
      const { name: languageName, color } = language

      nodes.push({
        id: `${LANGUAGE_KIND}-${languageName}`,
        kind: LANGUAGE_KIND,
        name: languageName,
        color,
      })

      links.push({
        id: `${LANGUAGE_KIND}-${languageName}-${REPOSITORY_KIND}-${repositoryName}`,
        source: `${LANGUAGE_KIND}-${languageName}`,
        target: `${REPOSITORY_KIND}-${repositoryName}`,
        size,
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
  return Component => ({ data, ...otherProps }) => {
    const { nodes, links } = toNodesAndLinks(data)

    return <Component {...{ nodes, links, ...otherProps }} />
  }
}

export default withNodesAndLinks()

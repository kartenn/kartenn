import { mergeWith, isArray, get, map, flatten, uniqBy } from "lodash"

import { Fragment } from "react"

import { compose } from "react-apollo"

import { Tag, Table } from "bloomer"

import parseCodeOwners from "../../lib/parseCodeOwners"

import withRepositories from "./withRepositories"
import withRepositoriesAutoPaging from "./withRepositoriesAutoPaging"

const HasReadme = ({ markdownReadme, textReadme }) => {
  return (
    <Fragment>
      {markdownReadme !== null || textReadme !== null ? "Yes" : "No"}
      {markdownReadme !== null && ", Markdown"}
      {textReadme !== null && ", Text"}
    </Fragment>
  )
}

const RepositoryTopics = ({ repositoryTopics }) => {
  const selector = repositoryTopics => {
    return repositoryTopics.edges.map(({ node: { topic } }) => topic)
  }

  return (
    <Fragment>
      {selector(repositoryTopics).map(({ name }) => (
        <Fragment>
          <Tag isColor="light" key={name}>
            {name}
          </Tag>{" "}
        </Fragment>
      ))}
    </Fragment>
  )
}

const CodeOwners = ({ codeOwners }) => {
  if (codeOwners === null) return "Missing"

  const { text } = codeOwners

  const parsedText = map(parseCodeOwners(text), "name").join(" ")

  return <Fragment>{parsedText}</Fragment>
}

const RepositoriesList = ({ data }) => {
  const repositories = map(
    get(data, "organization.repositories.edges", []),
    "node"
  )

  return (
    <Table isBordered isStriped isNarrow>
      <thead>
        <tr>
          <th>Name</th>
          <th>Code owners</th>
          <th>Has README?</th>
          <th>Topics</th>
        </tr>
      </thead>
      <tbody>
        {repositories.map(
          (
            {
              name,
              url,
              codeOwners,
              markdownReadme,
              textReadme,
              repositoryTopics,
            },
            index
          ) => (
            <tr key={name}>
              <td>
                <a href={url} target="_blank">
                  {name}
                </a>
              </td>
              <td>
                <CodeOwners {...{ codeOwners }} />
              </td>
              <td>
                <HasReadme {...{ markdownReadme, textReadme }} />
              </td>
              <td>
                <RepositoryTopics {...{ repositoryTopics }} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  )
}

export default compose(
  withRepositories,
  withRepositoriesAutoPaging
)(RepositoriesList)

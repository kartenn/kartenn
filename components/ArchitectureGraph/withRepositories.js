import { graphql } from "react-apollo"

import gql from "graphql-tag"

const REPOSITORIES = gql`
  query($first: Int = 50, $after: String = "") {
    organization(login: "lafourchette") {
      repositories(
        first: $first
        after: $after
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        totalCount

        pageInfo {
          endCursor
          hasNextPage
        }

        edges {
          node {
            name
            url
            createdAt
            diskUsage

            repositoryTopics(first: 100) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }

            markdownReadme: object(expression: "master:README.md") {
              ... on Blob {
                text
              }
            }

            textReadme: object(expression: "master:README.txt") {
              ... on Blob {
                text
              }
            }

            configDefault: object(expression: "master:config/default.js") {
              ... on Blob {
                text
              }
            }

            installerLocal: object(
              expression: "master:installer/local.js.tpl"
            ) {
              ... on Blob {
                text
              }
            }

            installerDefault: object(
              expression: "master:installer/default.json.tpl"
            ) {
              ... on Blob {
                text
              }
            }

            languages(first: 3, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  }
`

export default graphql(REPOSITORIES, {
  options: {
    variables: {
      first: 50,
      after: null,
    },
  },
})

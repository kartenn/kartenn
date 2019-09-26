import { graphql } from "react-apollo"

import gql from "graphql-tag"

const REPOSITORIES = gql`
  query($first: Int = 100, $after: String = "") {
    organization(login: "lafourchette") {
      repositories(
        first: $first
        after: $after
        isFork: false
        orderBy: { field: NAME, direction: ASC }
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }

        edges {
          node {
            name
            url
            createdAt

            codeOwners: object(expression: "master:.github/CODEOWNERS") {
              ... on Blob {
                text
              }
            }

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
          }
        }
      }
    }
  }
`

export default graphql(REPOSITORIES, {
  options: {
    variables: {
      first: 100,
      after: null,
    },
  },
})

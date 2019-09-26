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
        pageInfo {
          endCursor
          hasNextPage
        }

        edges {
          node {
            name
            descriptionHTML
            diskUsage
            url
            createdAt

            codeOwners: object(expression: "master:.github/CODEOWNERS") {
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
  props: ({ data }) => ({
    repositoriesData: data,
  }),
})

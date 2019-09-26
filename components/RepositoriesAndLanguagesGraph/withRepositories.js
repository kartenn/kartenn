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
      first: 100,
      after: null,
    },
  },
})

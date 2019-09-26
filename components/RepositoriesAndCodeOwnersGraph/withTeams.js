import { graphql } from "react-apollo"

import gql from "graphql-tag"

const TEAMS = gql`
  query($first: Int = 50, $after: String = "") {
    organization(login: "lafourchette") {
      teams(first: $first, after: $after) {
        totalCount
        edges {
          node {
            name
            slug
            members(first: 100) {
              totalCount
              edges {
                node {
                  name
                  login
                }
              }
            }
          }
        }
      }
    }
  }
`

export default graphql(TEAMS, {
  options: {
    variables: {
      first: 100,
      after: null,
    },
  },
  props: ({ data }) => ({
    teamsData: data,
  }),
})

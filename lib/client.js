const GITHUB_BASE_URL = "https://api.github.com/graphql"

import fetch from "node-fetch"

import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
      authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
    },
    fetch: fetch,
  }),
})

export default client

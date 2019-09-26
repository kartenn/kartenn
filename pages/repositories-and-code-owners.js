import { ApolloProvider } from "react-apollo"

import { Container, Content, Title, Subtitle } from "bloomer"

import client from "../lib/client"

import Layout from "../components/Layout"
import RepositoriesAndCodeOwnersGraph from "../components/RepositoriesAndCodeOwnersGraph"

export default function RepositoriesAndCodeOwnersPage(props) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Container>
          <Content>
            <Title>Repositories and code owners</Title>
            <Subtitle>Connections between developers, teams and code</Subtitle>
          </Content>
        </Container>
        <Container isFluid>
          <RepositoriesAndCodeOwnersGraph />
        </Container>
      </Layout>
    </ApolloProvider>
  )
}

import { ApolloProvider } from "react-apollo"

import { Container, Content, Title } from "bloomer"

import client from "../lib/client"

import Layout from "../components/Layout"
import RepositoriesList from "../components/RepositoriesList"

export default function IndexPage(props) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Container>
          <Content>
            <Title isSize={1}>Status of repositories</Title>
          </Content>
        </Container>
        <Container isFluid>
          <RepositoriesList />
        </Container>
      </Layout>
    </ApolloProvider>
  )
}

import { ApolloProvider } from "react-apollo"

import { Container, Title, Content } from "bloomer"

import client from "../lib/client"

import Layout from "../components/Layout"
import RepositoriesAndLanguagesGraph from "../components/RepositoriesAndLanguagesGraph"

export default function RepositoriesAndLanguagesPage(props) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Container>
          <Content>
            <Title isSize={1}>Repositories and languages</Title>
          </Content>
        </Container>
        <Container isFluid>
          <RepositoriesAndLanguagesGraph />
        </Container>
      </Layout>
    </ApolloProvider>
  )
}

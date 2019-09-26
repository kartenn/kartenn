import { ApolloProvider } from "react-apollo"

import {
  Container,
  Content,
  Card,
  CardContent,
  CardHeader,
  CardHeaderTitle,
  Title,
  Subtitle,
  Columns,
  Column,
} from "bloomer"

import client from "../lib/client"

import Layout from "../components/Layout"

export default function IndexPage(props) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Container>
          <Content>
            <Title isSize={1}>What is this about?</Title>ù
            <Subtitle>
              Kartenn shows the status of LaFourchette repositories and
              their relationships.
            </Subtitle>
          </Content>

          <Columns>
            <Column isSize="1/2">
              <Card href="/status-of-repositories">
                <CardHeader>
                  <CardHeaderTitle>Status of repositories</CardHeaderTitle>
                </CardHeader>
                <CardContent>
                  <Content>
                    A recap table containing (hopefully) meaningful info about
                    repositories.
                  </Content>
                </CardContent>
              </Card>
            </Column>
            <Column isSize="1/2">
              <Card href="/architecture">
                <CardHeader>
                  <CardHeaderTitle>Architecture</CardHeaderTitle>
                </CardHeader>
                <CardContent>
                  <Content>Architecture graph from READMEs.</Content>
                </CardContent>
              </Card>
            </Column>
          </Columns>
          <Columns>
            <Column isSize="1/2">
              <Card href="/repositories-and-code-owners">
                <CardHeader>
                  <CardHeaderTitle>
                    Repositories and code ownership
                  </CardHeaderTitle>
                </CardHeader>
                <CardContent>
                  <Content>Repositories, teams and developers.</Content>
                </CardContent>
              </Card>
            </Column>
            <Column isSize="1/2">
              <Card href="/repositories-and-languages">
                <CardHeader>
                  <CardHeaderTitle>Repositories and languages</CardHeaderTitle>
                </CardHeader>
                <CardContent>
                  <Content>
                    Most used language in The Fork and their relantionships with
                    repositories
                  </Content>
                </CardContent>
              </Card>
            </Column>
          </Columns>
        </Container>
      </Layout>
    </ApolloProvider>
  )
}

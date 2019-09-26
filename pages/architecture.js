import { ApolloProvider } from "react-apollo"

import { Container, Title, Columns, Column, Notification } from "bloomer"

import client from "../lib/client"

import Layout from "../components/Layout"
import ArchitectureGraph from "../components/ArchitectureGraph"
import { Content } from "bloomer/lib/elements/Content"

export default function ArchitecturePage(props) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Container>
          <Content>
            <Title>Architecture</Title>
          </Content>
          <Columns>
            <Column isSize="2/3">
              <Content>
                <p>
                  The following diagram shows the relationships between
                  repositories of NextGen projects.
                </p>
                <p>
                  Each hexagon represents a repository: bigger nodes means more
                  code in GitHub. Repositories are organized in four clusters:
                  starting from the left we have API-like, than gateways,
                  services and, on the right, workers.
                </p>
                <p>
                  Continuous links represents functional dependencies declared
                  in README files; dashed arc represent dependencies computed by
                  inspecting configuration files.
                </p>
                <p>
                  Once the page is loaded you'll see nodes comparing gradually:
                  that's because GitHub API has limitations on the length of
                  pagination pages. Diagram will eventually be completed once
                  all pages of results will be loaded from the API.
                </p>
              </Content>
              <hr />
            </Column>
          </Columns>
        </Container>

        <Container isFluid>
          <ArchitectureGraph />
        </Container>

        <Container>
          <Columns>
            <Column isSize="2/3">
              <hr />
              <Notification isColor="info">
                <strong>How to use the diagram.</strong> You can hover
                repositories to show direct dependencies as well as dragging
                nodes to better identify what you're looking for.
              </Notification>
            </Column>
          </Columns>
        </Container>
      </Layout>
    </ApolloProvider>
  )
}

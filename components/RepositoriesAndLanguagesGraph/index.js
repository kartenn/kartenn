import { compose } from "react-apollo"

import withRepositories from "./withRepositories"
import withRepositoriesAutoPaging from "./withRepositoriesAutoPaging"
import withNodesAndLinks from "./withNodesAndLinks"

import Graph from "../Graph"

const RepositoriesAndLanguagesGraph = ({ nodes, links }) => {
  return (
    <Graph
      style={{ width: "100%", height: "150vh" }}
      nodes={nodes}
      links={links}
    />
  )
}

export default compose(
  withRepositories,
  withRepositoriesAutoPaging,
  withNodesAndLinks
)(RepositoriesAndLanguagesGraph)

import { compose } from "react-apollo"

import withRepositories from "./withRepositories"
import withRepositoriesAutoPaging from "./withRepositoriesAutoPaging"
import withNodesAndLinks from "./withNodesAndLinks"

import BoundedGraph from "../BoundedGraph"

const ArchitectureGraph = ({ nodes, links }) => {
  return (
    <BoundedGraph
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
)(ArchitectureGraph)

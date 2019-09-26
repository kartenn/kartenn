import { compose } from "react-apollo"

import withRepositories from "./withRepositories"
import withTeams from "./withTeams"
import withRepositoriesAutoPaging from "./withRepositoriesAutoPaging"
import withTeamsAutoPaging from "./withTeamsAutoPaging"
import withNodesAndLinks from "./withNodesAndLinks"

import Graph from "../Graph"

const RepositoriesAndCodeOwnersGraph = ({ nodes, links }) => {
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
  withTeams,
  withTeamsAutoPaging,
  withNodesAndLinks
)(RepositoriesAndCodeOwnersGraph)

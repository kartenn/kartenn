import withAutoPaging from "../../enhancers/withAutoPaging"

const teamsPageInfoExtractor = (data = {}) => {
  const { organization = {} } = data
  const { teams = {} } = organization
  const { pageInfo = {} } = teams

  return pageInfo
}

const withTeamsAutoPaging = withAutoPaging({
  on: "teamsData",
  pageInfoExtractor: teamsPageInfoExtractor,
})

export default withTeamsAutoPaging

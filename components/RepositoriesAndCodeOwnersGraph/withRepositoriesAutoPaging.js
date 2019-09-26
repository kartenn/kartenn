import withAutoPaging from "../../enhancers/withAutoPaging"

const repositoriesPageInfoExtractor = (data = {}) => {
  const { organization = {} } = data
  const { repositories = {} } = organization
  const { pageInfo = {} } = repositories

  return pageInfo
}

const withRepositoriesAutoPaging = withAutoPaging({
  on: "repositoriesData",
  pageInfoExtractor: repositoriesPageInfoExtractor,
})

export default withRepositoriesAutoPaging

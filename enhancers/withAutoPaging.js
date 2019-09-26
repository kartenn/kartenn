import { mergeWith, isArray } from "lodash"

import { useEffect } from "react"

function withAutoPaging({
  on = "data",
  pageInfoExtractor = () => {
    throw "Define page ingo extractor, please"
  },
}) {
  return Component => ({ [on]: data, ...otherProps }) => {
    const { error, loading, variables, fetchMore } = data
    const { hasNextPage = false, endCursor = null } = pageInfoExtractor(data)

    useEffect(() => {
      if (!error && !loading && hasNextPage) {
        fetchMore({
          variables: {
            ...variables,
            after: endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return mergeWith(previousResult, fetchMoreResult, (a, b) =>
              isArray(a) ? a.concat(b) : undefined
            )
          },
        })
      }
    })

    return <Component {...{ [on]: data, ...otherProps }} />
  }
}

export default withAutoPaging

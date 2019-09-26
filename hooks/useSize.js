import { map, uniqBy } from "lodash"

import { useState, useEffect, useLayoutEffect } from "react"

const useSize = element => {
  const [width, setWidth] = useState(undefined)
  const [height, setHeight] = useState(undefined)

  useEffect(() => {
    const size = element.current.getBoundingClientRect()

    const { width, height } = size

    setWidth(width)
    setHeight(height)
  })

  return {
    width,
    height,
  }
}

export default useSize

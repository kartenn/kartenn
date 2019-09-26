import { range } from "d3"

// See: https://bl.ocks.org/vasturiano/e70e14483fe01eb0a3ea7d1d46a30571
function getPolygonPath(r, nSides, startAngle = Math.PI / 2) {
  let d = ""

  range(nSides)
    .map(side => {
      const angle = startAngle + (2 * Math.PI * side) / nSides
      return [r * Math.cos(angle), r * Math.sin(angle)]
    })
    .forEach(pt => {
      d += (d.length ? "L" : "M") + pt.join(",")
    })

  return d + "Z"
}

export default getPolygonPath

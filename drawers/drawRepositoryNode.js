import { scalePow } from "d3"

import getPolygonPath from "../lib/getPolygonPath"

function drawRepositoryNode(selection, { scale, showLabel = false }) {
  selection
    .append("path")
    .attr("d", ({ size }) => getPolygonPath(scale(size), 6))
    .attr("fill", "#589442")
    .attr("stroke", "#589442")
    .attr("stroke-opacity", 0.3)
    .attr("stroke-width", 3)

  if (showLabel) {
    selection
      .append("text")
      .attr("text-anchor", "middle")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 3)
      .text(({ name }) => name)
      .attr("y", ({ size = 0 }) => -(5 + scale(size)))

    selection
      .append("text")
      .attr("text-anchor", "middle")
      .text(({ name }) => name)
      .attr("y", ({ size = 0 }) => -(5 + scale(size)))
  }
}

export default drawRepositoryNode

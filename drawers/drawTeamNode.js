import { scalePow } from "d3"

import getPolygonPath from "../lib/getPolygonPath"

function drawTeamNode(selection, scale) {
  selection
    .append("circle")
    .attr("r", ({ size = 0 }) => scale(size))
    .attr("fill", "#ffffff")
    .attr("stroke", "#0082B2")
    .attr("stroke-width", 3)
    .append("text")
    .text(({ name }) => name)

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

export default drawTeamNode

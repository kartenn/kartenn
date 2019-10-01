import { scalePow } from "d3"

import getPolygonPath from "../lib/getPolygonPath"
import colors from './colors';

function drawRepositoryNode(selection, { scale, showLabel = false }) {
  selection
    .append("path")
    .attr("d", ({ size }) => getPolygonPath(scale(size), 6))
    .attr("stroke", "#589442")
    .attr("stroke-opacity", 0.3)
    .attr("stroke-width", 3)
    .style('fill', (d) => { return colors[d.layer] ? colors[d.layer] : '#589442'; });

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

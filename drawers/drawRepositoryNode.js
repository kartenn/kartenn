import { scalePow } from "d3"

import getPolygonPath from "../lib/getPolygonPath"
import colors from './colors';

function drawRepositoryNode(selection, { scale, showLabel = false }) {
  selection
    .append("path")
    .attr("d", ({ diskUsage }) => getPolygonPath(scale(diskUsage), 20))
    .attr("stroke", "#589442")
    .attr("stroke-opacity", 0.3)
    .attr("stroke-width", 1)
    .style('fill', (d) => { return colors[d.type] ? colors[d.type] : '#589442'; });

  if (showLabel) {
    selection
      .append("text")
      .attr("text-anchor", "middle")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
      .text(({ name }) => name)
      .attr("y", ({ diskUsage = 0 }) => -(5 + scale(diskUsage)))

    selection
      .append("text")
      .attr("text-anchor", "middle")
      .text(({ name }) => name)
      .attr("y", ({ diskUsage = 0 }) => -(5 + scale(diskUsage)))
  }
}

export default drawRepositoryNode

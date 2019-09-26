import getPolygonPath from "../lib/getPolygonPath"

function drawUserNode(selection, scale) {
  selection
    .append("path")
    .attr("d", getPolygonPath(5, 3, -Math.PI / 2))
    .attr("fill", "#FF9900")
    .attr("stroke", "#FF9900")
    .attr("stroke-opacity", 0.3)
    .attr("stroke-width", 3)
}

export default drawUserNode

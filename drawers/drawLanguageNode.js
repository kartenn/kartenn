import getPolygonPath from "../lib/getPolygonPath"

function drawLanguageNode(selection) {
  selection
    .append("path")
    .attr("d", getPolygonPath(5, 4))
    .attr("fill", ({ color }) => color)
    .attr("pointer-events", "all")
    .attr("stroke", ({ color }) => color)
    .attr("stroke-opacity", 0.3)
    .attr("stroke-width", 3)
}

export default drawLanguageNode

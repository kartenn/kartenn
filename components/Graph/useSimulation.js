import { uniqBy } from "lodash"

import { useState, useEffect, useLayoutEffect } from "react"

import {
  selectAll,
  select,
  merge,
  event,
  drag,
  range,
  scaleLinear,
  scalePow,
} from "d3"

import maxSizeByKind from "../../lib/maxSizeByKind"
import drawRepositoryNode from "../../drawers/drawRepositoryNode"
import drawUserNode from "../../drawers/drawUserNode"
import drawTeamNode from "../../drawers/drawTeamNode"
import drawLanguageNode from "../../drawers/drawLanguageNode"

import simulation from "./simulation"

const NODE_SIZE = 10

export const REPOSITORY_NODE_KIND = "repository"
export const USER_NODE_KIND = "user"
export const TEAM_NODE_KIND = "team"
export const LANGUAGE_NODE_KIND = "language"

const useSimulation = (nodesGroupElement, linksGroupElement, nodes, links) => {
  const [uniqueNodes, setUniqueNodes] = useState([])
  const [uniqueLinks, setUniqueLinks] = useState([])

  useEffect(() => {
    const simulationNodes = uniqBy([...uniqueNodes, ...nodes], "id")
    const simulationLinks = uniqBy([...uniqueLinks, ...links], "id")

    simulation.nodes(simulationNodes)
    simulation.force("link").links(simulationLinks)

    simulation.on("tick", ticked)

    const line = select(linksGroupElement.current)
      .selectAll("line")
      .data(simulationLinks)
      .join("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)

    const repositoryRadiusScale = scalePow()
      .exponent(0.5)
      .domain([0, maxSizeByKind(simulationNodes, REPOSITORY_NODE_KIND)])
      .range([5, 20])

    const repositoryNode = select(nodesGroupElement.current)
      .selectAll(".repository.node")
      .data(simulationNodes.filter(({ kind }) => kind === REPOSITORY_NODE_KIND))
      .join("g")
      .attr("class", "repository node")
      .call(drawRepositoryNode, { scale: repositoryRadiusScale })

    const userNode = select(nodesGroupElement.current)
      .selectAll(".user.node")
      .data(simulationNodes.filter(({ kind }) => kind === USER_NODE_KIND))
      .join("g")
      .attr("class", "user node")
      .call(drawUserNode)

    const teamRadiusScale = scalePow()
      .exponent(0.5)
      .domain([0, maxSizeByKind(simulationNodes, TEAM_NODE_KIND)])
      .range([5, 20])

    const teamNode = select(nodesGroupElement.current)
      .selectAll(".team.node")
      .data(simulationNodes.filter(({ kind }) => kind === TEAM_NODE_KIND))
      .join("g")
      .attr("class", "team node")
      .call(drawTeamNode, teamRadiusScale)

    const languageNode = select(nodesGroupElement.current)
      .selectAll(".language.node")
      .data(simulationNodes.filter(({ kind }) => kind === LANGUAGE_NODE_KIND))
      .join("g")
      .attr("class", "language node")
      .call(drawLanguageNode)

    // See https://github.com/d3/d3-selection/issues/89#issuecomment-281892883
    // and https://bost.ocks.org/mike/selection/
    // and https://github.com/d3/d3-selection/issues/86
    const allNodes = selectAll(
      merge([
        languageNode.nodes(),
        repositoryNode.nodes(),
        userNode.nodes(),
        teamNode.nodes(),
      ])
    ).call(
      drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    )
    // .on("mouseover", fade(0.1))
    // .on("mouseout", fade(1))

    setUniqueNodes(simulationNodes)
    setUniqueLinks(simulationLinks)

    simulation.alphaTarget(0.3).restart()

    function ticked() {
      const clamp = scaleLinear()
        .domain([-600 + NODE_SIZE, 600 - NODE_SIZE])
        .range([-600 + NODE_SIZE, 600 - NODE_SIZE])
        .clamp(true)

      // See https://bl.ocks.org/mbostock/1129492
      allNodes.attr(
        "transform",
        d => `translate(${(d.x = clamp(d.x))}, ${(d.y = clamp(d.y))})`
      )

      line
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
    }

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

    function dragstarted(d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(d) {
      if (!event.active) simulation.alphaTarget(0)

      d.fx = null
      d.fy = null
    }
  }, [nodes, links])

  return {
    simulation,
  }
}

export default useSimulation

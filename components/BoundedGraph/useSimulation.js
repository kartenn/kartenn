import {map, uniqBy} from "lodash"

import {useState, useEffect} from "react"

import {
    forceLink,
    forceManyBody,
    forceY,
    forceX,
    select,
    event,
    drag,
    range,
    scaleLinear,
    scalePoint,
    scalePow,
} from "d3"

import maxSizeByKind from "../../lib/maxSizeByKind"
import drawRepositoryNode from "../../drawers/drawRepositoryNode"

import simulation from "./simulation"

const NODE_SIZE = 10

export const REPOSITORY_NODE_KIND = "repository"
export const USER_NODE_KIND = "user"
export const TEAM_NODE_KIND = "team"
export const LANGUAGE_NODE_KIND = "language"

import {
    SERVICE_LAYER,
    GATEWAY_LAYER,
    API_LAYER,
    WORKER_LAYER,
} from "../ArchitectureGraph/withNodesAndLinks"

const FORCE_STRENGHT = 0.03

const layerRank = layer => {
    if (layer === WORKER_LAYER) return 0
    if (layer === SERVICE_LAYER) return 1
    if (layer === GATEWAY_LAYER) return 2
    if (layer === API_LAYER) return 3
};

const nodeSelected = (node, store) => {
    const selectedNode = store.getState()['selectedNode'];

    store.dispatch({
        type: 'SELECT_NODE',
        payload: selectedNode !== null && node.name === selectedNode.name ? null : node
    });
};

// See https://bl.ocks.org/mbostock/1062288 for collapsing
// and http://bl.ocks.org/d3noob/5141278 for directional
// and https://observablehq.com/@d3/cluster-dendrogram from curve path
// and http://bl.ocks.org/couchand/6420534 and Voronoi as selection
// and https://bl.ocks.org/PerterB/4a4b8b03c8d85db94e23 Voronoi for label placement
// and https://bl.ocks.org/mbostock/6123708 from drag and zoom
const useSimulation = (
   {nodesGroupElement, linksGroupElement},
   {nodes, links},
   {width, height},
   store
) => {
    const [uniqueNodes, setUniqueNodes] = useState([])
    const [uniqueLinks, setUniqueLinks] = useState([])

    useEffect(() => {
        select(nodesGroupElement.current).selectAll(".node").remove();
        select(linksGroupElement.current).selectAll(".link").remove();

        const simulationNodes = uniqBy([...nodes], "id");
        const simulationLinks = uniqBy([...links], "id");

        const repositoryRadiusScale = scalePow()
           .exponent(0.5)
           .domain([0, maxSizeByKind(simulationNodes, REPOSITORY_NODE_KIND)])
           .range([5, 20])

        const allRanks = map(
           [SERVICE_LAYER, GATEWAY_LAYER, API_LAYER, WORKER_LAYER],
           layerRank
        ).sort()

        // See https://bl.ocks.org/d3indepth/4ed842af47f23eeb5cf1755d4bb67073
        const scale = scalePoint()
           .domain(allRanks)
           .range([400, -400])

        const distance = link => {
            const {
                source: {layer: sourceLayer},
                target: {layer: targetLayer},
            } = link

            return Math.abs(
               scale(layerRank(sourceLayer)) - scale(layerRank(targetLayer))
            )
        }

        const linkForce = forceLink([])
           .id(d => d.id)
           .distance(distance)
           .strength(FORCE_STRENGHT * 3)

        const xForce = forceX()
           .strength(3 * FORCE_STRENGHT)
           .x(({layer}) => scale(layerRank(layer)))

        const yForce = forceY()
           .strength(FORCE_STRENGHT / 1.5)
           .y(0)

        const manyBodyForce = forceManyBody().strength(
           ({size}) =>
              -Math.pow(repositoryRadiusScale(size), 1.8) * FORCE_STRENGHT * 40
        )

        simulation
           .force("x", xForce)
           .force("y", yForce)
           .force("link", linkForce)
           .force("charge", manyBodyForce)
           .on("tick", ticked)

        simulation.nodes(simulationNodes)
        simulation.force("link").links(simulationLinks)

        const path = select(linksGroupElement.current)
           .selectAll("path")
           .data(simulationLinks)
           .join(enter =>
              enter
                 .append("path")
                 .attr("class", ({from}) => `arc from-${from}`)
                 .attr("marker-mid", "url(#marker)")
           )

        // See https://observablehq.com/@d3/selection-join for enter on join
        const node = select(nodesGroupElement.current)
           .selectAll(".node")
           .data(simulationNodes)
           .join(enter =>
              enter
                 .append("g")
                 .attr("class", "node")
                 .call(
                    drag()
                       .on("start", dragstarted)
                       .on("drag", dragged)
                       .on("end", dragended)
                 )
                 .call(drawRepositoryNode, {
                     scale: repositoryRadiusScale,
                     showLabel: true,
                 })
           )
           .on("mouseover", fade(0.1))
           .on("mouseout", fade(1))
           .on("click", node => nodeSelected(node, store))

        setUniqueLinks([]);
        setUniqueNodes([]);

        setUniqueNodes(simulationNodes)
        setUniqueLinks(simulationLinks)

        simulation.alphaTarget(0.2).restart()

        const clamp = scaleLinear()
           .domain([-600 + NODE_SIZE, 600 - NODE_SIZE])
           .range([-600 + NODE_SIZE, 600 - NODE_SIZE])
           .clamp(true)

        // See https://bl.ocks.org/mbostock/1129492
        const transform = d => {
            d.x = clamp(d.x)
            d.y = clamp(d.y)

            return `translate(${d.x}, ${d.y})`
        }

        const arc = d => {
            var dx = d.target.x - d.source.x,
               dy = d.target.y - d.source.y,
               dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

            return (
               "M" +
               d.source.x +
               "," +
               d.source.y +
               "A" +
               dr +
               "," +
               dr +
               " 0 0,1 " +
               d.target.x +
               "," +
               d.target.y
            )
        }

        // See https://bl.ocks.org/bjtucker/151f6344ffd02105a67a
        // and http://moritzstefaner.github.io/gridexperiments/
        function ticked() {
            node.attr("transform", transform)

            path.attr("d", arc)
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
            if (!event.active) simulation.alphaTarget(0.03)

            d.fx = null
            d.fy = null
        }

        // See https://gist.github.com/micahstubbs/d2362886844cff427e797ff992cc23ec
        const linkedByIndex = {}

        simulation
           .force("link")
           .links()
           .forEach(d => {
               linkedByIndex[`${d.source.id},${d.target.id}`] = 1
           })

        function isConnected(a, b) {
            return (
               linkedByIndex[`${a.id},${b.id}`] ||
               linkedByIndex[`${b.id},${a.id}`] ||
               a.id === b.id
            )
        }

        function fade(opacity) {
            return d => {
                node.style("opacity", function (o) {
                    const thisOpacity = isConnected(d, o) ? 1 : opacity
                    this.setAttribute("opacity", thisOpacity)
                    return thisOpacity
                })

                path.style("opacity", o =>
                   o.source === d || o.target === d ? 1 : opacity
                )
            }
        }
    }, [nodes, links])

    return {
        simulation,
    }
};

export default useSimulation

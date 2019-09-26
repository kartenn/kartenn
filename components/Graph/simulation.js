import { forceSimulation, forceLink, forceManyBody, forceX, forceY } from "d3"

import { REPOSITORY_NODE_KIND, TEAM_NODE_KIND } from "../Graph/useSimulation"

const DEFAULT_NODES = []
const DEFAULT_LINKS = []

const linkForce = forceLink(DEFAULT_LINKS)
  .id(d => d.id)
  .distance(40)
  .strength(1)

const manyBodyForce = forceManyBody().strength(({ kind }) => {
  if ([REPOSITORY_NODE_KIND, TEAM_NODE_KIND].includes(kind)) return -75

  return -40
})

// See also: https://bl.ocks.org/shimizu/e6209de87cdddde38dadbb746feaf3a3
// and: https://vallandingham.me/bubble_charts_with_d3v4.html
const simulation = forceSimulation()

// From: https://github.com/d3/d3-force/blob/master/README.md#simulation_alphaDecay
simulation.alphaDecay(1 - Math.pow(simulation.alphaMin(), 1 / 20))

// From: https://github.com/d3/d3-force/blob/master/README.md#simulation_velocityDecay
// Default value is 0.4: higher decays slower the simulation in a quicker way.
simulation.velocityDecay(0.2)

simulation
  .nodes(DEFAULT_NODES)
  .force("link", linkForce)
  .force("charge", manyBodyForce)
  .force("x", forceX())
  .force("y", forceY())

export default simulation

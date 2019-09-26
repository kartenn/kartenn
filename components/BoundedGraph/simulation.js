import { forceSimulation } from "d3"

const simulation = forceSimulation()

// From: https://github.com/d3/d3-force/blob/master/README.md#simulation_alphaDecay
// simulation.alphaDecay(1 - Math.pow(simulation.alphaMin(), 1 / 20))

// From: https://github.com/d3/d3-force/blob/master/README.md#simulation_velocityDecay
// Default value is 0.4: higher decays slower the simulation in a quicker way.
simulation.velocityDecay(0.6)

export default simulation

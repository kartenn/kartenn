import { useRef } from "react"

import useSimulation from "./useSimulation"
import useSize from "../../hooks/useSize"

const Graph = props => {
  const { style, links = [], nodes = [] } = props

  const svgElement = useRef(null)
  const { width, height } = useSize(svgElement)

  const nodesGroupElement = useRef(null)
  const linksGroupElement = useRef(null)
  const { simulation } = useSimulation(
    nodesGroupElement,
    linksGroupElement,
    nodes,
    links
  )

  return (
    <div className="graph">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        ref={svgElement}
      >
        <g>
          <g className="links" ref={linksGroupElement} />
          <g className="nodes" ref={nodesGroupElement} />
        </g>
        <style jsx global>{`
          line {
            stroke: #cccccc;
            stroke-opacity: 0.6;
            stroke-with: 2px;
          }
        `}</style>
      </svg>
    </div>
  )
}

export default Graph

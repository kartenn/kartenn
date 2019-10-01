import {useRef, useEffect} from "react"

import useSimulation from "./useSimulation"
import useSize from "../../hooks/useSize"

const BoundedGraph = props => {
    const {style, links = [], nodes = []} = props

    const svgElement = useRef(null)
    const {width, height} = useSize(svgElement)

    const containerGroupElement = useRef(null)
    const nodesGroupElement = useRef(null)
    const linksGroupElement = useRef(null)
    const {simulation} = useSimulation(
       {nodesGroupElement, linksGroupElement, containerGroupElement},
       {nodes, links},
       {width, height},
       props.store
    );

    return (
       <div className="graph">
           <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              style={style}
              {...width &&
              height && {
                  viewBox: `${-width / 2} ${-height / 2} ${width} ${height}`,
              }}
              preserveAspectRatio="xMidYMid slice"
              ref={svgElement}
           >
               <defs>
                   <marker
                      id="marker"
                      viewBox="0 -5 10 10"
                      refX="15"
                      refY="-0"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto"
                   >
                       <path d="M0,-5L10,0L0,5"/>
                   </marker>
               </defs>
               <g ref={containerGroupElement}>
                   <g className="links" ref={linksGroupElement}/>
                   <g className="nodes" ref={nodesGroupElement}/>
               </g>
               <style jsx global>{`
          line {
            stroke: #cccccc;
            stroke-opacity: 0.6;
            stroke-width: 2px;
          }

          text {
            font-size: 0.75rem;
            pointer-events: none;
          }

          .arc {
            fill: none;
            stroke: #333;
            stroke-width: 2px;
          }

          .arc.from-config {
            stroke: #bbb;
            stroke-dasharray: 10 2;
            stroke-width: 1px;
          }

          g {
            -webkit-transition: opacity 0.1s ease-in-out;
            -moz-transition: opacity 0.1s ease-in-out;
            -ms-transition: opacity 0.1s ease-in-out;
            -o-transition: opacity 0.1s ease-in-out;
            transition: opacity 0.1s ease-in-out;
          }
        `}</style>
           </svg>
       </div>
    )
};

export default BoundedGraph

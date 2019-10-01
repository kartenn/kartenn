import {compose} from "react-apollo"
import React, {Component} from 'react';

import withRepositories from "./withRepositories"
import withRepositoriesAutoPaging from "./withRepositoriesAutoPaging"
import withNodesAndLinks from "./withNodesAndLinks"

import BoundedGraph from "../BoundedGraph"

class ArchitectureGraph extends Component {
    getLinksAndNodes = () => {
        const links = this
           .props
           .links
           .filter(l =>
              (typeof l.source === 'string' && l.source.indexOf(this.props.searchTerm) !== -1) ||
              (typeof l.source === 'object' && l.source.name.indexOf(this.props.searchTerm) !== -1) ||
              (typeof l.target === 'string' && l.target.indexOf(this.props.searchTerm) !== -1) ||
              (typeof l.target === 'object' && l.target.name.indexOf(this.props.searchTerm) !== -1)
           );

        const nodes = this
           .props
           .nodes
           .filter(n =>
              n.name.indexOf(this.props.searchTerm) !== -1 ||
              typeof links.find(l =>
                 typeof l.source === 'string' && l.source === n.id ||
                 typeof l.source === 'object' && l.source.id === n.id ||
                 typeof l.target === 'string' && l.target === n.id ||
                 typeof l.target === 'object' && l.target.id === n.id
              ) !== 'undefined'
           );

        return { links, nodes };
    };

    render() {
        return (
           <BoundedGraph
              style={{width: "100%", height: "150vh"}}
              {...(this.getLinksAndNodes ? this.getLinksAndNodes() : {nodes: [], links: []})}
           />
        )
    }
}

export default compose(
   withRepositories,
   withRepositoriesAutoPaging,
   withNodesAndLinks
)(ArchitectureGraph)

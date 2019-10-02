import {compose} from "react-apollo"
import React, {Component} from 'react';

import withRepositories from "./withRepositories"
import withRepositoriesAutoPaging from "./withRepositoriesAutoPaging"
import withNodesAndLinks from "./withNodesAndLinks"

import BoundedGraph from "../BoundedGraph"
import linkMatchesSearchTerm from "../../helpers/linkMatchesSearchTerm";
import nodeIsDependencyToSearchTerm from "../../helpers/nodeIsDependencyToSearchTerm";
import nodeMatchesSearchTerm from "../../helpers/nodeMatchesSearchTerm";

class ArchitectureGraph extends Component {
    getLinksAndNodes = () => {
        if (this.props.selectedNode === null) {
            const links = this.props.links.filter(l => linkMatchesSearchTerm(l, this.props.searchTerm));

            return {
                links: [],
                nodes: this.props.nodes.filter(n => nodeMatchesSearchTerm(n, this.props.searchTerm))
            };
        }

        const links = this.props.links.filter(l => linkMatchesSearchTerm(l, this.props.selectedNode.name));
        const nodes = this
           .props
           .nodes
           .filter(n => n.name === this.props.selectedNode.name || nodeIsDependencyToSearchTerm(n, links));

        return { links, nodes };
    };

    render() {
        return (
           <BoundedGraph
              style={{width: "100%", height: "150vh"}}
              store={this.props.store}
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

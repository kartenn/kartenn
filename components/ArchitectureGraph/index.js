import {compose} from "react-apollo"
import React, {Component} from 'react';

import withRepositories from "./withRepositories"
import withRepositoriesAutoPaging from "./withRepositoriesAutoPaging"
import withNodesAndLinks from "./withNodesAndLinks"

import BoundedGraph from "../BoundedGraph"

class ArchitectureGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            links: []
        }
    }

    componentDidMount() {
        this.setState({
            nodes: this.props.nodes,
            links: this.props.links
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.searchTerm !== this.props.searchTerm || nextProps.nodes.length !== this.props.nodes.length;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const links = this
           .props
           .links
           .filter(l =>
              l.source.indexOf(this.props.searchTerm) !== -1 ||
              l.target.indexOf(this.props.searchTerm) !== -1
           );

        const nodes = this
           .props
           .nodes
           .filter( n =>
              n.name.indexOf(this.props.searchTerm) !== -1 ||
              typeof links.find(l => l.source === n.id || l.target === n.id) !== 'undefined'
           );

        this.setState({
            links,
            nodes
        });
    }

    render() {
        return (
           <BoundedGraph
              style={{width: "100%", height: "150vh"}}
              nodes={this.state.nodes}
              links={this.state.links}
           />
        )
    }
}

export default compose(
   withRepositories,
   withRepositoriesAutoPaging,
   withNodesAndLinks
)(ArchitectureGraph)

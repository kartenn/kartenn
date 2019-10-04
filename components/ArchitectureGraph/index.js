import React from 'react';

import BoundedGraph from "../BoundedGraph"
import nodeMatchesSearchTerm from "../../helpers/nodeMatchesSearchTerm";
import dependenciesToLinksTransformer from "../../transformers/dependenciesToLinksTransformer";

function getLinksAndNodes(allNodes, dependencyNodes, searchTerm, selectedNode) {
    if (selectedNode === null) {
        return {
            links: [],
            nodes: allNodes.filter(n => nodeMatchesSearchTerm(n, searchTerm))
        };
    }

    return {
        links: dependenciesToLinksTransformer(allNodes[0]),
        nodes: allNodes.concat(dependencyNodes)
    };
}

function ArchitectureGraph(props) {
    const linksAndNodes = getLinksAndNodes(props.nodes, props.dependencyNodes, props.searchTerm, props.selectedNode);

    return (
        <BoundedGraph
           style={{width: "100%", height: "150vh"}}
           store={props.store}
           {...linksAndNodes}
        />
    );
}

export default ArchitectureGraph;

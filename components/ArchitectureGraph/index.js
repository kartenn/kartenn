import React from 'react';

import BoundedGraph from "../BoundedGraph"
import nodeMatchesSearchTerm from "../../helpers/nodeMatchesSearchTerm";
import dependenciesToLinksTransformer from "../../transformers/dependenciesToLinksTransformer";

function getLinksAndNodes(allNodes, dependencyNodes, searchTerm, selectedNode, loading) {
    if (selectedNode === null) {
        return {
            links: [],
            nodes: allNodes.filter(n => nodeMatchesSearchTerm(n, searchTerm))
        };
    }

    return {
        links: loading ? [] : dependenciesToLinksTransformer(allNodes[0]),
        nodes: allNodes.concat(dependencyNodes)
    };
}

function ArchitectureGraph({nodes, dependencyNodes, searchTerm, selectedNode, loading, store}) {
    const linksAndNodes = getLinksAndNodes(nodes, dependencyNodes, searchTerm, selectedNode, loading);

    return (
        <BoundedGraph
           style={{width: "100%", height: "150vh"}}
           store={store}
           {...linksAndNodes}
        />
    );
}

export default ArchitectureGraph;

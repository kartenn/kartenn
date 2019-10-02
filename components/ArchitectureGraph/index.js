import React, {useState, useEffect} from 'react';

import BoundedGraph from "../BoundedGraph"
import linkMatchesSearchTerm from "../../helpers/linkMatchesSearchTerm";
import nodeIsDependencyToSearchTerm from "../../helpers/nodeIsDependencyToSearchTerm";
import nodeMatchesSearchTerm from "../../helpers/nodeMatchesSearchTerm";

function getLinksAndNodes(allNodes, allLinks, searchTerm, selectedNode) {
    if (selectedNode === null) {
        return {
            links: [],
            nodes: allNodes.filter(n => nodeMatchesSearchTerm(n, searchTerm))
        };
    }

    const links = allLinks.filter(l => linkMatchesSearchTerm(l, selectedNode.name));
    const nodes = allNodes.filter(n => n.name === selectedNode.name || nodeIsDependencyToSearchTerm(n, links));

    return { links, nodes };
}

function ArchitectureGraph(props) {
    const linksAndNodes = getLinksAndNodes(props.nodes, [], props.searchTerm, props.selectedNode);

    return (
        <BoundedGraph
           style={{width: "100%", height: "150vh"}}
           store={props.store}
           nodes={linksAndNodes.nodes}
           links={[]}
        />
    );
}

export default ArchitectureGraph;

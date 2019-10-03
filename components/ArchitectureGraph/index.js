import React, {useState, useEffect} from 'react';

import BoundedGraph from "../BoundedGraph"
import linkMatchesSearchTerm from "../../helpers/linkMatchesSearchTerm";
import nodeIsDependencyToSearchTerm from "../../helpers/nodeIsDependencyToSearchTerm";
import nodeMatchesSearchTerm from "../../helpers/nodeMatchesSearchTerm";

function getLinksAndNodes(allNodes, dependencyNodes, searchTerm, selectedNode) {
    if (selectedNode === null) {
        return {
            links: [],
            nodes: allNodes.filter(n => nodeMatchesSearchTerm(n, searchTerm))
        };
    }

    console.log(dependencyNodes);

//    const links = allLinks.filter(l => linkMatchesSearchTerm(l, selectedNode.name));
    const nodes = allNodes.filter(n => n.name === selectedNode.name /*|| nodeIsDependencyToSearchTerm(n, links)*/);

    return { links: [], nodes: nodes.concat(dependencyNodes) };
}

function ArchitectureGraph(props) {
    const linksAndNodes = getLinksAndNodes(props.nodes, props.dependencyNodes, props.searchTerm, props.selectedNode);

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

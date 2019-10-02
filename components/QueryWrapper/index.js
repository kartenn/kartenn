import React, {useState, useEffect} from 'react';
import {useQuery} from "@apollo/react-hooks"

import listProjects from "../../graphql/listProjects.graphql";
import client from "../../lib/client";
import projectsToNodesTransformer from "../../transformers/projectsToNodesTransformer";
import IdentityCard from "../IdentityCard";
import ArchitectureGraph from "../ArchitectureGraph";

function QueryWrapper(props) {
    const {data} = useQuery(listProjects, { client });
    const nodes = data ? projectsToNodesTransformer(data.listProjects) : [];

    return (
       <div style={{display: 'flex'}}>
           <div style={{width: '20%', margin: '0.5%'}}>
               <IdentityCard store={props.store} selectedNode={props.selectedNode} />
           </div>
           <div style={{width: '100%'}}>
               <ArchitectureGraph
                  {...props}
                  nodes={nodes}
               />
           </div>
       </div>
    );
}

export default QueryWrapper;

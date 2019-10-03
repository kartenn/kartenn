import React, {useState, useEffect} from 'react';
import {useQuery} from "@apollo/react-hooks"

import listProjects from "../../graphql/listProjects.graphql";
import getProject from "../../graphql/getProject.graphql";
import client from "../../lib/client";
import projectsToNodesTransformer from "../../transformers/projectsToNodesTransformer";
import projectToNodeTransformer from "../../transformers/projectToNodeTransformer";
import IdentityCard from "../IdentityCard";
import ArchitectureGraph from "../ArchitectureGraph";

function QueryWrapper(props) {

    let nodes = [];

    if (props.selectedNode !== null) {
        // const {data} = useQuery(getProject, { projectUuid: props.selectedNode.projectUuid, client });
        const {data} = useQuery(getProject, { projectUuid: '734c80d1-959e-4fbf-a641-ccd6045616fd', client });
        console.log(data);
        nodes = data ? projectToNodeTransformer(data.getProject) : [];
    } else {
        const {data} = useQuery(listProjects, { client });
        nodes = data ? projectsToNodesTransformer(data.listProjects) : [];
    }

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

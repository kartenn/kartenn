import {Query} from "@apollo/react-components";

import listProjects from "../../graphql/listProjects.graphql";
import getProject from "../../graphql/getProject.graphql";
import projectToNodeTransformer from "../../transformers/projectToNodeTransformer";
import client from "../../lib/client";
import projectsToNodesTransformer from "../../transformers/projectsToNodesTransformer";
import GraphAndCardWrapper from "../GraphAndCardWrapper";

function QueryWrapper(props) {

    let nodes = [];

    if (props.selectedNode !== null) {
        return <Query query={getProject} client={client}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                nodes = data ? projectToNodeTransformer(data.getProject) : [];

                return (
                    <GraphAndCardWrapper
                       {...props}
                       nodes={nodes}
                    />
                );
            }}
        </Query>
    }

    return <Query query={listProjects} client={client}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            nodes = data ? projectsToNodesTransformer(data.listProjects) : [];

            return (
               <GraphAndCardWrapper
                  {...props}
                  nodes={nodes}
               />
            );
        }}
    </Query>;
}

export default QueryWrapper;

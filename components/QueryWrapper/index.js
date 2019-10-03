import {Query} from "@apollo/react-components";

import listProjects from "../../graphql/listProjects.graphql";
import getProject from "../../graphql/getProject.graphql";
import getProjectsByNames from '../../graphql/getProjectsByNames.graphql';
import projectToNodeTransformer from "../../transformers/projectToNodeTransformer";
import client from "../../lib/client";
import projectsToNodesTransformer from "../../transformers/projectsToNodesTransformer";
import GraphAndCardWrapper from "../GraphAndCardWrapper";

function QueryWrapper(props) {

    let nodes = [];

    if (props.selectedNode !== null) {
        return <Query query={getProject} variables={{projectUuid: props.selectedNode.projectUuid}} client={client}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                nodes = data ? projectToNodeTransformer(data.getProject) : [];

                let dependencies = [];
                if (nodes[0] && nodes[0].calls) {
                    dependencies = dependencies.concat(nodes[0].calls);
                }
                if (nodes[0] && nodes[0].called) {
                    dependencies = dependencies.concat(nodes[0].called);
                }

                return (
                    <Query query={getProjectsByNames} variables={{projectNames: dependencies}} client={client}>
                        {projects => {
                            if (projects.loading) return "Loading...";
                            if (projects.errors) return `Error! ${error.message}`;
                            const dependencyNodes = projects.data ?
                               projectsToNodesTransformer(projects.data.getProjectsByNames) : [];

                            return <GraphAndCardWrapper
                               {...props}
                               nodes={nodes}
                               dependencyNodes={dependencyNodes}
                            />
                        }}
                    </Query>
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

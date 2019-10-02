import React, {Component, Fragment} from "react";
import ArchitectureGraph from "../../components/ArchitectureGraph";
import IdentityCard from "../../components/IdentityCard";
import client from "../../lib/client";
import {ApolloProvider} from "react-apollo";

class Inno extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            selectedNode: null
        }
    }

    componentDidMount() {
        this.props.store.subscribe(this.handleStoreChanged);
    }

    handleStoreChanged = () => {
        this.setState({
            searchTerm: this.props.store.getState().searchTerm,
            selectedNode: this.props.store.getState().selectedNode
        });
    };

    render() {
        return (
           <div style={{display: 'flex'}}>
               <div style={{width: '20%', margin: '0.5%'}}>
                   <IdentityCard store={this.props.store} selectedNode={this.state.selectedNode}/>
               </div>
               <div style={{width: '100%'}}>
                   <ArchitectureGraph
                      {...this.state}
                      store={this.props.store}
                   />
               </div>
           </div>
        );
    }

}

export default Inno;

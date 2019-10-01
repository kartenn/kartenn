import React, {Component} from "react";
import ArchitectureGraph from "../../components/ArchitectureGraph";

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
           <ArchitectureGraph
              {...this.state}
              store={this.props.store}
           />
        );
    }

}

export default Inno;

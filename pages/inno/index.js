import React, {Component} from "react";
import QueryWrapper from "../../components/QueryWrapper";

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
           <QueryWrapper
              {...this.state}
              store={this.props.store}
           />
        );
    }

}

export default Inno;

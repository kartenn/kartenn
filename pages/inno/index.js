import React, {Component} from "react";
import ArchitectureGraph from "../../components/ArchitectureGraph";

class Kartenn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        }
    }

    componentDidMount() {
        this.props.store.subscribe(this.handleSearchTermChanged);
    }

    handleSearchTermChanged = () => {
        this.setState({
            searchTerm: this.props.store.getState().searchTerm
        });
    };

    render() {
        return (
           <ArchitectureGraph searchTerm={this.state.searchTerm} />
        );
    }

}

export default Kartenn;

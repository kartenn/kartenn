import React, { Component } from 'react';
import {Input} from "bloomer";

class DebouncedInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeoutId: null
        };
    }

    handleChange = (e) => {
        const value = e.target.value;

        if (this.state.timeoutId !== null) {
            clearTimeout(this.state.timeoutId);
        }

        const timeoutId = setTimeout(() => { this.props.onChange(value); }, this.props.delay);

        this.setState({ timeoutId })
    };

    render() {
        return <Input
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
        />
    }
}

export default DebouncedInput;

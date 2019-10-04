import React, { Component } from 'react';
import {Input} from "bloomer";

class DebouncedInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeoutId: null,
            value: this.props.value ? this.props.value : ''
        };
    }

    handleChange = (e) => {
        const value = e.target.value;

        if (this.state.timeoutId !== null) {
            clearTimeout(this.state.timeoutId);
        }

        const timeoutId = setTimeout(() => { this.props.onChange(value); }, this.props.delay);

        this.setState({ timeoutId, value })
    };

    render() {
        return <Input
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            value={this.state.value}
        />
    }
}

export default DebouncedInput;

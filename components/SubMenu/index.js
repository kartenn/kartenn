import {Fragment} from "react";
import {Tag} from 'bloomer';
import ColorsMethods from '../../drawers/colorsMethods'
import Params from "../Params";

class SubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};
    }

    handleClick = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };

    formatMethod(type, name) {
        if (ColorsMethods[type]) {
            return (
                <Fragment>
                    <Tag style={{
                        backgroundColor: ColorsMethods[type],
                        marginRight: '3%',
                        color: 'white',
                        width: '50px',
                        fontSize: '9px',
                        fontWeight: 'bold'
                    }}>
                        {type}
                    </Tag>
                    <span>{ name }</span>
                </Fragment>
            )
        } else {
            return <span>{ name }</span>
        }
    }

    render() {
        return (
            <Fragment>
                <li className='method' key={ this.props.index }>
                    <div className="method-head" style={{cursor: 'pointer', fontSize: '12px'}} onClick={this.handleClick}>
                        {this.formatMethod(this.props.type, this.props.name)}
                    </div>
                    {this.state.isToggleOn && this.props.params ? <Params params={this.props.params} /> : <Fragment/>}
                </li>
            </Fragment>
        )
    }
}

export default SubMenu

import {Fragment} from "react";
import {Tag} from 'bloomer';
import ColorsMethods from '../../drawers/colorsMethods'

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

    formatMethod(method) {
        const splitMethod = method.split(" ");
        if (ColorsMethods[splitMethod[0]]) {
            return (
                <Fragment>
                    <Tag style={{backgroundColor: ColorsMethods[splitMethod[0]], marginRight: '3%'}}>{ splitMethod[0] }</Tag>
                    <span>{ splitMethod[1] }</span>
                </Fragment>
            )
        } else {
            return <span>{ splitMethod[0] }</span>
        }
    }

    render() {
        return (
            <Fragment>
                <li key={ this.props.index }>
                    <p style={{cursor: this.state.isToggleOn ? 'zoom-out' : 'zoom-in'}} onClick={this.handleClick}>
                        {this.formatMethod(this.props.name)}
                    </p>
                    {/*{this.props.response ? <pre>{this.props.response.description}</pre> : null }*/}
                    {this.state.isToggleOn ? (
                        <ul>
                            {this.props.params.map(function({name, description, type, required}, index){
                                return (
                                    <li key={ index }>
                                        <p style={{fontWeight: required ? 'bold' : 'normal'}}>{name} ({type})</p>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : <Fragment/>}
                </li>
            </Fragment>
        )
    }
}

export default SubMenu

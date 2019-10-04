import {Fragment} from "react";
import {Tag} from 'bloomer';
import ColorsMethods from '../../drawers/colorsMethods'
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                    <Tag style={{backgroundColor: ColorsMethods[splitMethod[0]], marginRight: '3%', color: 'white', width: '50px', fontSize: '10px'}}>{ splitMethod[0] }</Tag>
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
                <li style={{margin: '3px'}} key={ this.props.index }>
                    <p style={{cursor: 'pointer', fontSize: '12px'}} onClick={this.handleClick}>
                        {this.formatMethod(this.props.name)}
                    </p>
                    {/*{this.props.response ? <pre>{this.props.response.description}</pre> : null }*/}
                    {this.state.isToggleOn && this.props.params ? (
                        <ul>
                            {this.props.params.map(function({name, description, type, required}, index){
                                return (
                                    <li style={{listStyle: 'inside', marginLeft: '10%', fontSize: '12px'}} key={ 'n' + index }>
                                        <span style={{fontWeight: required ? 'bold' : 'normal'}}>{name} ({type})</span>
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

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
                <li className='methods' key={ this.props.index }>
                    <p style={{cursor: 'pointer', fontSize: '12px'}} onClick={this.handleClick}>
                        {this.formatMethod(this.props.name)}
                    </p>
                    {/*{this.props.response ? <pre>{this.props.response.description}</pre> : null }*/}
                    {this.state.isToggleOn && this.props.params ? (
                        <ul style={{border: '1px dashed black', width: '100%', backgroundColor: '#f1f2f6', margin: '5px'}}>
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

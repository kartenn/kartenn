import {Fragment} from "react";

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

    render() {
        return (
            <Fragment>
                <li key={ this.props.index }>
                    <p onClick={this.handleClick}>{this.props.name}</p>
                    {this.props.response ? <pre>{this.props.response.description}</pre> : null }
                    {this.state.isToggleOn ? (
                        <ul>
                            {this.props.params.map(function({name, description, type, required}, index){
                                return (
                                    <li key={ index }>
                                        <p>{name}</p>
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

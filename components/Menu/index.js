import {PanelHeading} from 'bloomer';
import {Fragment} from "react";
import SubMenu from "../SubMenu";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    }

    handleClick = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };

    render() {
        return (
            <Fragment>
                <PanelHeading style={{backgroundColor: '#77B5FE', color: 'white', cursor: this.state.isToggleOn ? 'zoom-out' : 'zoom-in'}} onClick={this.handleClick}>{this.props.title}</PanelHeading>
                {this.state.isToggleOn ? (
                    <ul>
                        {this.props.tree.map(function(item, index){
                            return <SubMenu {...item} />
                        })}
                    </ul>
                ) : <Fragment/>}
            </Fragment>
        )
    }
}

export default Menu

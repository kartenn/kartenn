import {PanelHeading, PanelBlock} from 'bloomer';
import {Fragment} from "react";
import SubMenu from "../SubMenu";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Menu extends React.Component {
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
                <PanelHeading style={{backgroundColor: '#77B5FE', color: 'white', cursor: 'pointer'}} onClick={this.handleClick}>
                    <FontAwesomeIcon icon={this.state.isToggleOn ? faMinus : faPlus} size='xs' style={{margin: '0 3%'}} />
                    {this.props.title}
                </PanelHeading>
                {this.state.isToggleOn ? (
                    <PanelBlock>
                        <ul>
                            {this.props.tree.map(function(item, index){
                                return <SubMenu {...item} index={index}/>
                            })}
                        </ul>
                    </PanelBlock>
                ) : <Fragment/>}
            </Fragment>
        )
    }
}

export default Menu

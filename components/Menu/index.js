import {Input, PanelBlock} from 'bloomer';
import {Fragment} from "react";
import SubMenu from "../SubMenu";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            search: ''
        };
    }

    handleClick = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };

    handleSearchChange = e => {
        this.setState({
            search: e.target.value
        })
    };

    render() {
        return (
            <Fragment>
                <PanelBlock style={{backgroundColor: '#77B5FE', color: 'white', cursor: 'pointer'}} onClick={this.handleClick}>
                    <FontAwesomeIcon icon={this.state.isToggleOn ? faMinus : faPlus} size='xs' style={{margin: '0 3%'}} />
                    {this.props.title}
                </PanelBlock>
                {this.state.isToggleOn ? (
                    <PanelBlock style={{flexDirection: 'column', backgroundColor: 'white', padding: '0'}}>
                        <Input
                           placeholder="Search..."
                           onChange={this.handleSearchChange}
                           isSize="small"
                        />
                        <ul style={{width: '100%'}}>
                            {this
                               .props
                               .tree
                               .filter(i => i.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
                               .map((item, index) => <SubMenu {...item} key={index}/>)
                            }
                        </ul>
                    </PanelBlock>
                ) : <Fragment/>}
            </Fragment>
        )
    }
}

export default Menu

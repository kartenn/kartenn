import {Panel, PanelHeading, PanelTabs, PanelTab, PanelBlock, PanelIcon, Icon, Control} from 'bloomer';
import DebouncedInput from "../DebouncedInput";
import {Fragment} from "react";

class IdentityCard extends React.Component {

    handleSearch = (value) => {
        this.props.store.dispatch({type: 'SEARCH', payload: value});
    };

    renderIdentity = () => {
        const selectedNode = this.props.selectedNode;
        if (selectedNode) {
            return (
                <Fragment>
                    <PanelBlock isActive>
                        <PanelIcon className="fa fa-github" />
                        {selectedNode.name}
                    </PanelBlock>
                    <PanelTabs>
                        <PanelTab isActive>methods</PanelTab>
                        <PanelTab>events</PanelTab>
                    </PanelTabs>
                </Fragment>
            )
        }
    }

    render() {
        return (
            <Panel>
                <PanelHeading>Micro Service</PanelHeading>
                <PanelBlock>
                    <Control hasIcons='left'>
                        <DebouncedInput
                            placeholder='Find a micro-service'
                            onChange={this.handleSearch}
                            delay={1000}
                        />
                        <Icon isSize='small' isAlign='left'>
                            <span className='fa fa-search' aria-hidden='true'/>
                        </Icon>
                    </Control>
                </PanelBlock>
                {this.renderIdentity()}
            </Panel>
        )
    }
}

export default IdentityCard;

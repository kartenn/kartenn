import {Panel, PanelHeading, PanelTabs, PanelTab, PanelBlock, PanelIcon, Icon, Control, Tag} from 'bloomer';
import DebouncedInput from "../DebouncedInput";
import {Fragment} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';


class IdentityCard extends React.Component {

    handleSearch = (value) => {
        this.props.store.dispatch({type: 'SEARCH', payload: value});
    };

    renderIdentity = () => {
        console.log(this.props.selectedNode);

        const selectedNode = this.props.selectedNode;
        if (selectedNode) {
            return (
                <Fragment>
                    <PanelBlock>
                        <FontAwesomeIcon icon={faGithub} size='xs' style={{margin: '3%'}}/>
                        <a href={selectedNode.url} target='_blank'>{selectedNode.name}</a>
                    </PanelBlock>
                    <PanelBlock>Information</PanelBlock>
                    <PanelBlock>
                        <Tag isColor='black' style={{margin : '2%'}}>{selectedNode.layer}</Tag>
                    </PanelBlock>
                    <PanelBlock>methods</PanelBlock>
                    <PanelBlock>events</PanelBlock>
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
                            <FontAwesomeIcon icon={faSearch} size='xs' style={{margin: '0.5%'}}/>
                        </Icon>
                    </Control>
                </PanelBlock>
                {this.renderIdentity()}
            </Panel>
        )
    }
}

export default IdentityCard;

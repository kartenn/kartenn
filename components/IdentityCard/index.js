import {Panel, PanelHeading, PanelBlock, Icon, Control, Tag} from 'bloomer';
import DebouncedInput from "../DebouncedInput";
import {Fragment} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import colors from '../../drawers/colors';

class IdentityCard extends React.Component {

    handleSearch = (value) => {
        this.props.store.dispatch({type: 'SEARCH', payload: value});
    };

    renderIdentity = () => {
        const selectedNode = this.props.selectedNode;
        if (selectedNode) {
            return (
                <Fragment>
                    <PanelBlock style={{backgroundColor: colors[selectedNode.type]}}>
                        <FontAwesomeIcon icon={faGithub} size='xs' style={{margin: '3%'}}/>
                        <a href={selectedNode.url} target='_blank'>{selectedNode.name}</a>
                    </PanelBlock>
                    <PanelBlock>Information</PanelBlock>
                    <PanelBlock>
                        <Tag isColor={colors[selectedNode.type]} style={{margin : '2%'}}>{selectedNode.type}</Tag>
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
                <PanelHeading>
                    <FontAwesomeIcon icon={faSitemap} size='sm' style={{margin: '0 3%'}}/>
                    <span style={{padding: '3%'}}>Kartenn</span>
                </PanelHeading>
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

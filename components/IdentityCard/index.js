import {Panel, PanelHeading, PanelBlock, Icon, Control, Tag} from 'bloomer';
import DebouncedInput from "../DebouncedInput";
import {Fragment} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSitemap, faCalendar, faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons';
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
                    <PanelBlock>
                        <FontAwesomeIcon icon={faGithub} size='xs' style={{margin: '3%'}}/>
                        <a href={selectedNode.url} target='_blank'>{selectedNode.name}</a>
                    </PanelBlock>
                    <PanelBlock>Information</PanelBlock>
                    <PanelBlock>
                        <div style={{display: 'inline'}}>
                            <FontAwesomeIcon icon={faCalendar} size='xs' style={{margin: '3%'}}/>
                            {selectedNode.createdTs}
                        </div>
                        <div style={{display: 'inline'}}>
                            <FontAwesomeIcon icon={faCalendarCheck} size='xs' style={{margin: '3%'}}/>
                            {selectedNode.updateTs}
                        </div>
                        <div style={{display: 'inline'}}>
                            <FontAwesomeIcon icon={faUser} size='xs' style={{margin: '3%'}}/>
                            {selectedNode.coderOwner}
                        </div>
                        <Tag style={{backgroundColor: colors[selectedNode.type], margin : '2%', color:'white'}}>{selectedNode.type}</Tag>
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
                        <span className="icon is-left">
                            <FontAwesomeIcon icon={faSearch} size='xs' style={{margin: '0.5%'}}/>
                        </span>
                    </Control>

                </PanelBlock>
                {this.renderIdentity()}
            </Panel>
        )
    }
}

export default IdentityCard;

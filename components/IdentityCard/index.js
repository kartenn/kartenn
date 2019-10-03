import {Panel, PanelHeading, PanelBlock, Message, Control, Tag} from 'bloomer';
import DebouncedInput from "../DebouncedInput";
import {Fragment} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSitemap, faCalendar, faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import colors from '../../drawers/colors';

class IdentityCard extends React.Component {

    formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)
    }

    handleSearch = (value) => {
        this.props.store.dispatch({type: 'SEARCH', payload: value});
    };

    renderIdentity = () => {
        const selectedNode = this.props.selectedNode;

        if (selectedNode) {
            const contentNodes = this.props.nodes[0];

            return (
                <Fragment>
                    <PanelBlock style={{backgroundColor: 'white'}}>
                        <Message style={{backgroundColor: 'white'}}>
                            <span>
                                <FontAwesomeIcon icon={faGithub} size='xs' style={{margin: '0 3%'}}/>
                                <a href={contentNodes.url} target='_blank'>{contentNodes.name}</a>
                            </span>
                            <Tag style={{backgroundColor: colors[contentNodes.type], margin : '2%', color:'white'}}>{contentNodes.type}</Tag>
                            <br/><small>Created at : {this.formatDate(contentNodes.createdTs)}</small>
                            <br/><small>Last update : {this.formatDate(contentNodes.updatedTs)}</small>
                            <br/><small>Code owners : {contentNodes.codeOwners}</small>
                        </Message>
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
                <PanelHeading style={{backgroundColor: '#77B5FE', color: 'white'}}>
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

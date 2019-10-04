import {Panel, PanelHeading, PanelBlock, Message, Control, Tag} from 'bloomer';
import DebouncedInput from "../DebouncedInput";
import {Fragment} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSitemap, faUndo } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import colors from '../../drawers/colors';
import languagesColors from '../../drawers/colorsLanguages';
import Menu from '../Menu'

class IdentityCard extends React.Component {

    formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)
    };

    handleSearch = (value) => {
        this.props.store.dispatch({type: 'SEARCH', payload: value});
    };

    handleClick = () => {
        this.props.store.dispatch({
            type: 'SELECT_NODE',
            payload: null
        })
    };

    renderIdentity = () => {
        const selectedNode = this.props.selectedNode;

        if (this.props.loading) {
            return 'Loading...';
        }

        if (selectedNode) {
            const contentNodes = this.props.nodes[0];

            return (
                <Fragment>
                    <PanelBlock style={{backgroundColor: 'white', position: 'relative'}}>
                        <a onClick={this.handleClick}>
                            <div style={{position: 'absolute', top: '5px', right: '5px'}}>
                                <FontAwesomeIcon icon={faUndo} size='sm' />
                            </div>
                        </a>
                        <Message style={{backgroundColor: 'white'}}>
                            <span>
                                <FontAwesomeIcon icon={faGithub} size='xs' style={{margin: '0 3%', width: '20px', height: '20px'}}/>
                                <a href={contentNodes.urlRepository} target='_blank'>{contentNodes.name}</a>
                            </span>
                            <Tag
                               style={{
                                   backgroundColor: colors[contentNodes.type],
                                   margin : '2%',
                                   color:'white'
                               }}
                            >
                                {contentNodes.type}
                            </Tag>
                            <div style={{fontSize: '0.8rem'}}>
                                Created at : {this.formatDate(contentNodes.createdTs)}
                            </div>
                            <div style={{fontSize: '0.8rem'}}>
                                Last update : {this.formatDate(contentNodes.updatedTs)}
                            </div>
                            <div>
                                {contentNodes.languages.map((l, i) => (
                                   <Tag
                                      key={i}
                                      style={{
                                          margin:'2%',
                                          color: languagesColors[l] ? languagesColors[l].front : '#FFFFFF',
                                          backgroundColor: languagesColors[l] ? languagesColors[l].back : '#000000'
                                      }}
                                   >
                                       {l}
                                   </Tag>
                                ))}
                            </div>
                            <div>
                                {contentNodes.codeOwners.map((c, i) => {
                                    return <Tag key={i} isColor='light' style={{ margin : '2%'}}>{c}</Tag>
                                })}
                            </div>
                        </Message>
                    </PanelBlock>
                    {contentNodes.methods ? <Menu tree={contentNodes.methods} title='Methods'/> : null }
                    {contentNodes.events ? <Menu tree={contentNodes.events} title='Events'/> : null }
                </Fragment>
            )
        }
    };

    render() {
        return (
            <Panel>
                <PanelHeading style={{backgroundColor: '#77B5FE', color: 'white'}}>
                    <FontAwesomeIcon icon={faSitemap} size='sm' style={{margin: '0 3%'}}/>
                    <span style={{padding: '3%'}}>Kartenn</span>
                </PanelHeading>
                {this.props.selectedNode === null ? (
                    <PanelBlock>
                        <Control hasIcons='left'>
                           <DebouncedInput
                              placeholder='Find a micro-service'
                              onChange={this.handleSearch}
                              delay={1000}
                              value={this.props.searchTerm}
                           />
                            <span className="icon is-left">
                                <FontAwesomeIcon icon={faSearch} size='xs' style={{margin: '0.5%'}}/>
                            </span>
                        </Control>
                    </PanelBlock>
                ) : null}
                {this.renderIdentity()}
            </Panel>
        )
    }
}

export default IdentityCard;

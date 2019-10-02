import {Button, Field, Panel, PanelHeading, PanelBlock, Icon, Control, Tag} from 'bloomer';
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
                    <PanelBlock>
                        <FontAwesomeIcon icon={faGithub} size='xs' style={{margin: '3%'}}/>
                        <a href={selectedNode.url} target='_blank'>{selectedNode.name}</a>
                    </PanelBlock>
                    <PanelBlock>Information</PanelBlock>
                    <PanelBlock>
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
                    <Field hasAddons style={{width: '100%'}}>
                        <Control>
                            <Button>
                                <FontAwesomeIcon icon={faSearch} size='xs' style={{margin: '0.5%'}}/>
                            </Button>
                        </Control>
                        <Control style={{width: '100%'}}>
                            <DebouncedInput
                               placeholder='Find a micro-service'
                               onChange={this.handleSearch}
                               delay={1000}
                            />
                        </Control>
                    </Field>
                </PanelBlock>
                {this.renderIdentity()}
            </Panel>
        )
    }
}

export default IdentityCard;

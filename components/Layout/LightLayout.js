import "../../styles/styles.scss"

import Head from "next/head"
import Link from "next/link"
import ActiveAwareNavbarItem from "../ActiveAwareNavbarItem"

import { Fragment } from "react"
import {
    Button,
    Control,
    Field,
    LevelItem,
    LevelLeft,
    LevelRight,
    Navbar,
    NavbarBrand,
    NavbarBurger,
    NavbarMenu,
    NavbarStart,
    Footer,
    Container,
    Content,
    Section,
} from "bloomer"
import DebouncedInput from "../DebouncedInput";

class LightLayout extends React.Component {
    handleSearch = (value) => {
        this.props.store.dispatch({type: 'SEARCH', payload: value});
    };

    render() {
        return (
           <Fragment>
               <Head>
                   <title>Kartenn</title>
                   <meta httpEquiv="cache-control" content="no-cache" />
                   <meta httpEquiv="expires" content="0" />
                   <meta httpEquiv="pragma" content="no-cache" />
               </Head>

               <Navbar>
                   <LevelLeft>
                       <LevelItem>
                           <NavbarBrand>
                               <Link href="/" passHref>
                                   <ActiveAwareNavbarItem>Kartenn</ActiveAwareNavbarItem>
                               </Link>
                               <NavbarBurger />
                           </NavbarBrand>
                       </LevelItem>
                   </LevelLeft>
                   <LevelRight style={{flex: 1}}>
                       <LevelItem>
                           <NavbarMenu>
                               <NavbarStart>
                                   <Field hasAddons>
                                       <Control>
                                           <DebouncedInput
                                              placeholder='Find a micro-service'
                                              onChange={this.handleSearch}
                                              delay={1000}
                                           />
                                       </Control>
                                       <Control>
                                           <Button>Search</Button>
                                       </Control>
                                   </Field>
                               </NavbarStart>
                           </NavbarMenu>
                       </LevelItem>
                   </LevelRight>
               </Navbar>
               <Section>
                   <Container isFluid>
                       {this.props.children}
                   </Container>
               </Section>
               <Footer id="footer">
                   <Container>
                       <Content>
                           <strong>Kartenn</strong> — Ehi repositories! How you doin' today?
                       </Content>
                   </Container>
               </Footer>
           </Fragment>
        );
    }
}

export default LightLayout;

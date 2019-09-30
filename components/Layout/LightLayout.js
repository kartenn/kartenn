import "../../styles/styles.scss"

import Head from "next/head"
import Link from "next/link"
import ActiveAwareNavbarItem from "../ActiveAwareNavbarItem"

import { Fragment } from "react"
import {
    Button,
    Control,
    Field,
    Input,
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
import {ApolloProvider} from "react-apollo";

class LightLayout extends React.Component {
    handleSearch = (e) => {
        this.props.store.dispatch({type: 'SEARCH', payload: e.target.value});
    };

    render() {
        return (
           <Fragment>
               <Head>
                   <title>Kartenn</title>
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
                                           <Input
                                              placeholder='Find a micro-service'
                                              onChange={this.handleSearch}
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

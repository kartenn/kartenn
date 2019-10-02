import "../../styles/styles.scss"

import Head from "next/head"

import { Fragment } from "react"
import {
    Footer,
    Container,
    Content,
    Section,
} from "bloomer"

class LightLayout extends React.Component {
    render() {
        return (
           <Fragment>
               <Head>
                   <title>Kartenn</title>
                   <meta httpEquiv="cache-control" content="no-cache" />
                   <meta httpEquiv="expires" content="0" />
                   <meta httpEquiv="pragma" content="no-cache" />
               </Head>
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

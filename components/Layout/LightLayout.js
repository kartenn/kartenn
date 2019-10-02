import "../../styles/styles.scss"

import Head from "next/head"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

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
                           <strong>Kartenn</strong>
                           <a style={{margin: '0 10px'}} href="https://github.com/kartenn" target="_blank">
                               <FontAwesomeIcon icon={faGithub} />
                           </a>
                           <div>
                               Project made with ❤ during TheFork's innovation week by Carlo Camarda, Romain Delouard,
                               Vladimir Kosmala, Pierre Rolland, Julien Stanek and Silvano Stralla
                           </div>
                       </Content>
                   </Container>
               </Footer>
           </Fragment>
        );
    }
}

export default LightLayout;

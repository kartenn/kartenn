import "../../styles/styles.scss"

import Head from "next/head"
import Link from "next/link"
import ActiveAwareNavbarItem from "../ActiveAwareNavbarItem"

import { Fragment } from "react"
import {
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

const Layout = props => (
  <Fragment>
    <Head>
      <title>Kartenn</title>
    </Head>

    <Navbar>
      <Container>
        <NavbarBrand>
          <Link href="/" passHref>
            <ActiveAwareNavbarItem>Kartenn</ActiveAwareNavbarItem>
          </Link>
          <NavbarBurger />
        </NavbarBrand>
        <NavbarMenu>
          <NavbarStart>
            <Link href="/status-of-repositories" passHref>
              <ActiveAwareNavbarItem>
                Status of repositories
              </ActiveAwareNavbarItem>
            </Link>
            <Link href="/repositories-and-code-owners" passHref>
              <ActiveAwareNavbarItem>Code owners</ActiveAwareNavbarItem>
            </Link>
            <Link href="/repositories-and-languages" passHref>
              <ActiveAwareNavbarItem>Languages</ActiveAwareNavbarItem>
            </Link>
            <Link href="/architecture" passHref>
              <ActiveAwareNavbarItem>Architecture</ActiveAwareNavbarItem>
            </Link>
          </NavbarStart>
        </NavbarMenu>
      </Container>
    </Navbar>
    <Section>{props.children}</Section>
    <Footer id="footer">
      <Container>
        <Content>
          <strong>Kartenn</strong> — Ehi repositories! How you doin' today?
        </Content>
      </Container>
    </Footer>
  </Fragment>
)

export default Layout

import Link from "next/link"
import { withRouter } from "next/router"

import { NavbarItem } from "bloomer"

function ActiveAwareNavbarItem({ children, router, href, ...rest }) {
  const { route } = router
  const isActive = href === route

  return <NavbarItem {...{ href, isActive, ...rest }}>{children}</NavbarItem>
}

export default withRouter(ActiveAwareNavbarItem)

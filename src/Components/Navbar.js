import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="nav">
        <Nav horizontal="center">
          <NavItem>
            <NavLink href="/signup">Sign up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Log in</NavLink>
          </NavItem>
        </Nav>
    </div>
  )
}

export default NavBar

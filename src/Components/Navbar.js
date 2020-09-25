// import React from 'react'
import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

const NavBar = () => {
  return (
    <div className="nav-bar">
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

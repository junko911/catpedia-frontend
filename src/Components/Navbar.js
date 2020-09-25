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
            <NavLink href="/cats">Images</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/breeds">Breeds</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/favorites">Favorites</NavLink>
          </NavItem>
        </Nav>
    </div>
  )
}

export default NavBar

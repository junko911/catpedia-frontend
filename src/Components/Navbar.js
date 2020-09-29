import React from 'react'
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
          <NavItem>
            <NavLink href="/upload_image">Upload</NavLink>
          </NavItem>
        </Nav>
    </div>
  )
}

export default NavBar

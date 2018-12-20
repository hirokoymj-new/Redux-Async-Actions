import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = (props) => {
  return(
    <Navbar>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/">
            List
          </NavItem>
          <NavItem eventKey={2} href="/create">
            Create
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Header;
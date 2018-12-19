import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import cx from 'classnames';
import 'font-awesome/css/font-awesome.min.css';

const Header = (props) => {
  return(
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/"><h2>React/Redux async demo</h2></a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/" className={cx({'active': props.history.location.pathname === '/'})}>
            Dashboard
          </NavItem>
          <NavItem eventKey={2} href="/create" className={cx({'active': props.history.location.pathname === '/create'})}>
            Create
          </NavItem>
          <NavItem eventKey={3} href="https://github.com/hirokoymj/React-Redux-async-app" className="github-menu">
            <i className="fa fa-github"></i>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Header;
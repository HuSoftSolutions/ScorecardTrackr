import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import './index.css';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Navbar className="navigation" expand="lg">
    <Navbar.Brand as={Link} to={ROUTES.HOME}>
      Score Trackr
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="flex-fill">
        <Nav.Link as={Link} to={ROUTES.LANDING}>
          Landing
        </Nav.Link>
        <Nav.Link as={Link} to={ROUTES.HOME}>
          Home
        </Nav.Link>
        <Nav.Link as={Link} to={ROUTES.ACCOUNT}>
          Account
        </Nav.Link>
      </Nav>
      <Nav.Link className="ml-auto">
        <SignOutButton />
      </Nav.Link>
    </Navbar.Collapse>
  </Navbar>
);

const NavigationNonAuth = () => (
  <Navbar className="navigation" expand="lg">
    <Navbar.Brand as={Link} to={ROUTES.SIGN_IN}>
      Score Trackr
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="flex-fill">
        <Nav.Link as={Link} to={ROUTES.LANDING}>
          Landing
        </Nav.Link>
        <Nav.Link as={Link} to={ROUTES.SIGN_IN}>
          Sign In
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;

import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { useStore } from "../../store";
import './index.scss';
import {
  Navbar,
  Nav,
  Popover,
  OverlayTrigger,
  Container,
  Button
} from 'react-bootstrap';


const Navigation = () => {

  const { state, dispatch } = useStore();

  const [user, loading, error] = useAuthState(auth);
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  const fetchUserRoles = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc?.docs[0]?.data();

      setUserRoles(data?.roles);

    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/signin");

    fetchUserRoles();
  }, [user, loading]);

  return (user ? <NavigationAuth authUser={user} navigate={(x) => navigate(x)} state={state} /> : <NavigationNonAuth />);
}

const GoToActiveRound = ({id, navigate}) => {

  function onClick() {
    navigate(ROUTES.ROUND + `/${id}`)
  }

  return (
    <Button className="mx-2" variant="success" onClick={onClick}>Go To Active Round</Button>
  )
}

const NavigationAuth = ({ authUser, state, navigate }) => (
  <Navbar className="navigation w-100" bg="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand as={Link} to={ROUTES.HOME} className="text-white small">
        scoretrackr <span className="small text-gold">beta</span>
      </Navbar.Brand>
      <Navbar.Toggle className="bg-white text-dark" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-links flex-fill">
          <Nav.Link className="text-white" as={Link} to={ROUTES.LANDING}>landing</Nav.Link>
          <Nav.Link className="text-white" as={Link} to={ROUTES.HOME}>home</Nav.Link>
          <Nav.Link className="text-white" as={Link} to={ROUTES.HISTORY}>history</Nav.Link>
          <Nav.Link className="text-white" as={Link} to={ROUTES.ACCOUNT}>account</Nav.Link>
        </Nav>
        <Nav.Link className="mr-auto">
          {state.round_id ? <GoToActiveRound navigate={navigate} id={state.round_id} /> : null}
          <SignOutButton />
        </Nav.Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const NavigationNonAuth = () => (
  <Navbar className="navigation" bg="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand as={Link} to={ROUTES.HOME} className="text-white small">scoretrackr <span className="small text-black">beta</span></Navbar.Brand>
      <Navbar.Toggle className="bg-white text-dark" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-links">
          {/* <Nav.Link className="text-white" as={Link} to={ROUTES.LANDING}>home</Nav.Link> */}
          <Nav.Link className="text-white" as={Link} to={ROUTES.SIGN_IN}>login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)





export default Navigation;

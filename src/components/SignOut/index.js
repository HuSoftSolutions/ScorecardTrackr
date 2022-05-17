import React from 'react';
import { Button } from 'react-bootstrap';
import { auth, db, logout } from "../../firebase";

const SignOutButton = () => (
  <Button onClick={logout}>
    Sign Out
  </Button>
);

export default SignOutButton;

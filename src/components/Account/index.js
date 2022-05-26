import React, { Component } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import "./index.scss"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";

const AccountPage = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="account-container">
      <h5 className="mb-2">
        Signed in: <span className="text-success">{user?.email}</span>
      </h5>
      {/* <PasswordForgetForm /> */}
      <div className="">
      </div>
    </div>
  );
}


export default AccountPage;

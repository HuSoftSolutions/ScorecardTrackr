import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import "./index.css";

const PasswordForgetPage = () => (
  <div className="pf-container">
    <h1>Forgot Password</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <div className="pf-container">
      <p>Send Password Reset Email</p>
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Control
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </Form.Group>
        <Form.Group>
          <Button block disabled={isInvalid} type="submit">
            Reset My Password
          </Button>
        </Form.Group>
        {error && <p>{error.message}</p>}
      </Form>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="m-0 my-2 p-0">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };

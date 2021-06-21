import React, { Component, Row, Col } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import "./index.css";

const SignUpPage = () => (
  <div className="signup-container">
    <Card className="signup-card align">
      <SignUpForm />
    </Card>
  </div>
);

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  passwordOne: "",
  error: null,
  isAdmin: false,
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { firstName, lastName, email, passwordOne, isAdmin } = this.state;
    const roles = { USER: "USER" };
    const username = firstName + " " + lastName;
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase.user(authUser.user.uid).set({
          firstName,
          lastName,
          email,
          roles,
          username,
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      firstName,
      lastName,
      passwordOne,
      email,
      phone,
      error,
      isAdmin,
    } = this.state;

    const formCompleted =
      passwordOne !== "" &&
      email !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      isValidPhoneNumber(phone);

    return (
      <div className="align">
        <h1 className="pl-3 pt-3">Howdy Partner!</h1>
        <Card.Title className="px-3">
          Time to play some golf, but first lets create an account!
        </Card.Title>
        <Card.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group
              className="d-flex w-100"
              controlId="formBasicNameFields"
            >
              <div className="w-50 mr-1">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={this.state.firstName}
                  onChange={this.onChange}
                  name="firstName"
                  placeholder="John"
                />
              </div>

              <div className="w-50 l-1">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  checked={this.state.lastName}
                  onChange={this.onChange}
                  placeholder="Doe"
                  name="lastName"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                as={Input}
                country="US"
                showCountrySelect={false}
                placeholder="(518) 762-3717"
                value={this.state.phone}
                onChange={(phone) => {
                  this.setState({ phone: phone });
                }}
              />

              <Form.Text className="text-muted">
                This is necessary for booking a tee time.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            {error && (
              <p className="pb-1" style={{ color: "red" }}>
                {error.message}
              </p>
            )}
            {!formCompleted && (
              <p style={{ color: "red" }}>
                Please complete each field in order to submit!
              </p>
            )}
            {formCompleted && !error && (
              <p style={{ color: "green" }}>Your info looks good!</p>
            )}
            <Button
              className={"w-100"}
              variant={formCompleted && !error ? "success" : "danger"}
              disabled={!formCompleted}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
          
        </Card.Body>
      </div>
    );
  }
}

const SignUpBtn = () => (
  <Button className="primary" />
)

const SignUpLink = () => (
    <p className="m-0 my-2 p-0">

    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };

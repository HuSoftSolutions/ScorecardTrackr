import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Form, Button, Card } from 'react-bootstrap';
import { LoadingIcon } from "../../utils/LoadingIcon";
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './index.css';

const SignInPage = () => (
  <div className="login-container">
    <Card className="col-10 col-lg-4 align border-0 p-3">
      <Card.Title>Login</Card.Title>
      <SignInForm />
      <SignInGoogle />
      <div className="pt-4">
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    </Card>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error, loading } = this.state;

    const isInvalid = password === '' || email === '';

    const loginForm = (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="FormBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="FormBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="input-field"
            size="lg"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
        </Form.Group>
        {loading ? (
          loadingIcon
        ) : (
          <div className="py-3">
            <Button
              onClick={this.onSubmit}
              className="w-100"
              disabled={isInvalid}
              type="submit"
              variant={isInvalid ? "primary" : "danger"}
            >
              Login
            </Button>
          </div>
        )}
        {error && (
          <Card
            className="text-white text-align-center mt-2 mb-0"
            bg="danger"
          >
            <Card.Body>{error.message}</Card.Body>
          </Card>
        )}
      </Form>
    );

    return loginForm;
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = (event) => {
    this.props.firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      <div className="py-2" >
        <Button onClick={this.onSubmit} className="w-100" type="submit" variant="primary">
          Sign In with Google
        </Button>

        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInPage;

export { SignInForm, SignInGoogle };

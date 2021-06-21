import React, { Component } from "react";
import { compose } from "recompose";
import { Button, Form, ListGroup } from "react-bootstrap";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import "./index.css"

const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null,
  },
  {
    id: "google.com",
    provider: "googleProvider",
  },
];

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div className="ap-container">
        <h5 className="mb-2">
          Signed in: <span className="text-success">{authUser.email}</span>
        </h5>
        <div className="body">
          <PasswordForgetForm />
          <LoginManagement authUser={authUser} />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then((activeSignInMethods) =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch((error) => this.setState({ error }));
  };

  onSocialLoginLink = (provider) => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  onDefaultLoginLink = (password) => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  onUnlink = (providerId) => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <div className="ap-container">
        <p>Sign In Methods:</p>
        <div>
          {SIGN_IN_METHODS.map((signInMethod) => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(signInMethod.id);

            return (
              <div key={signInMethod.id}>
                {signInMethod.id === "password" ? (
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onDefaultLoginLink}
                    onUnlink={this.onUnlink}
                  />
                ) : (
                  <SocialLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onSocialLoginLink}
                    onUnlink={this.onUnlink}
                  />
                )}
              </div>
            );
          })}
        </div>
        {error && error.message}
      </div>
    );
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ? (
    <Button
      block
      type="Button"
      className="danger"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </Button>
  ) : (
    <Button block className="mt-3" type="Button" onClick={() => onLink(signInMethod.provider)}>
      Link {signInMethod.id}
    </Button>
  );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: "", passwordTwo: "" };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: "", passwordTwo: "" });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return isEnabled ? (
      <Button
        block
        type="Button"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </Button>
    ) : (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Control
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
          />
        </Form.Group>
        <Form.Group>
          <Button block disabled={isInvalid} type="submit">
            Link {signInMethod.id}
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = (authUser) => !!authUser;

export default compose(withAuthorization(condition))(AccountPage);

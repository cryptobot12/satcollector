import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';


const SignInPage = () => (
  <div>
    {/* <h1>SignIn</h1> */}
    <SignInForm />
  </div>
);
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.BUY);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
        <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" value={email} onChange={this.onChange} id="exampleEmail" placeholder="Email address" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePasswordOne">Password</Label>
                <Input type="password" name="password" value={password} onChange={this.onChange} id="examplePasswordOne" placeholder="Password" />
              </FormGroup>
            </Col>
          </Row>
          <Button
          primary disabled={isInvalid} type="submit" color="primary" size="lg">
              Sign In
          </Button>
          <FormGroup>
            <PasswordForgetLink />
          </FormGroup>
          <FormGroup>
            <SignUpLink />
          </FormGroup>
        </Form>
      </Container>
      // <form onSubmit={this.onSubmit}>
      //   <input
      //     name="email"
      //     value={email}
      //     onChange={this.onChange}
      //     type="text"
      //     placeholder="Email Address"
      //   />
      //   <input
      //     name="password"
      //     value={password}
      //     onChange={this.onChange}
      //     type="password"
      //     placeholder="Password"
      //   />
      //   <button disabled={isInvalid} type="submit">
      //     Sign In
      //   </button>
      //   {error && <p>{error.message}</p>}
      // </form>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };
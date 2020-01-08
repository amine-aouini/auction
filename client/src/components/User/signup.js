import React from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.nameChange = this.nameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.prenventDefault();

    axios
      .post("/signupDb", this.state)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  nameChange(event) {
    event.preventDefault();

    this.setState({ name: event.target.value });
    console.log(this.state);
  }

  emailChange(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
    console.log(this.state);
  }

  passwordChange(event) {
    event.preventDefault();
    this.setState({ password: event.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={this.state.value}
            onChange={this.nameChange}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={this.state.value}
            onChange={this.emailChange}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={this.state.value}
            onChange={this.passwordChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default SignUp;

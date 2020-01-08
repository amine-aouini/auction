import React from "react";
import { Button, Form } from "react-bootstrap";
import signUpService from "../services/signUpService";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    signUpService.getAll(this.state).then(res => {
      if (res.data === "user already exists") {
        document.getElementById("dataError").textContent =
          "Email already exist";
      }
      if (res.data.saved === true) {
        document.getElementById("dataError").textContent = "";
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div id="dataError"></div>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={this.state.value}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {" "}
          Submit{" "}
        </Button>
      </Form>
    );
  }
}

export default SignUp;

import React from "react";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import signUpService from "../../services/signUpService.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      show: false,
      alert: 'success',
      message: 'Email already exist',
      showModal: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hundleShowAlert() {

  }
  handleSubmit(event) {
    event.preventDefault();
    signUpService.getAll(this.state).then(res => {
      if (res.data === "user already exists") {

        this.setState({
          show: true,
          alert: 'danger',
          message: 'Email already exist',
        })
      }
      else {

        this.setState({
          show: true,
          alert: 'success',
          message: 'Sign up Successful'

        })
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      show: false
    });

  }
  handleClose() {
    this.setState({ showModal: false })
  }
  render() {
    return (
      // <div className='signup'>

      <Modal className='signup' show={this.props.showModal} onHide={() => { this.props.onHide() }}>
        <Form onSubmit={this.handleSubmit}>
          <Alert variant={this.state.alert} show={this.state.show} dismissible>

            {this.state.message}

          </Alert>
          <div id="dataError"></div>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email </Form.Label>
            <Form.Control
              name="email"
              value={this.state.value}
              onChange={this.handleChange}
              type="email"
              placeholder="Enter email"
              required
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
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            SugnUp
        </Button>
        </Form>
      </Modal>
      // </div>
    );
  }
}

export default SignUp;

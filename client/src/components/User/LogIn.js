import React from "react";
import logInServices from "../../services/logInservice.js";
import { Button, Form, Modal } from 'react-bootstrap';
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logIn() {
    logInServices.checkForLogIn(this.state).then(res => {
      this.props.changeUserName(res.data.user.name);
      window.localStorage.setItem("token", res.data.token);
    });
  }

  handleSubmit(e) {
    this.logIn();
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }

  render() {
    return (
      // <form onSubmit={this.handleSubmit}>
      //   <label for="email">
      //     email
      //     <input
      //       type="text"
      //       name="email"
      //       value={this.state.email}
      //       onChange={this.handleChange}
      //     />
      //   </label>
      //   <br />
      //   <label for="password">
      //     password
      //     <input
      //       type="password"
      //       name="password"
      //       value={this.state.password}
      //       onChange={this.handleChange}
      //     />
      //   </label>
      //   <br />
      //   <input type="submit" value="Submit" />
      // </form>

      <Modal className='signup' show={this.props.showModal} onHide={() => { this.props.onHide() }}>
        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Form.Group className='text-center'>
            <Button variant="primary" type="submit">
              Login
          </Button></Form.Group>
        </Form>
      </Modal>

    );
  }
}
export default LogIn;

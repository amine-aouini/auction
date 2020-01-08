import React from "react";
import logInServices from "../../services/logInservice.js";
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
      <form onSubmit={this.handleSubmit}>
        <label for="email">
          email
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label for="password">
          password
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default LogIn;

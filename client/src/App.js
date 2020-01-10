import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Button,
  Form,
  Alert,
  Modal,
  Navbar,
  Nav,
  NavDropdown,
  FormControl
} from "react-bootstrap";
import LogIn from "./components/User/LogIn.js";
import SignUp from "./components/User/signup";

import signOutService from "./services/signOutServices";

import Home from "./components/home"

import AddProduct from "./components/Product/addProduct";
import AddCategory from "./components/category/AddCategory";
import NavbarCategory from "./components/category/navBarCategory";
import checkToken from "./services/checkToken";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      showModalSignUp: false,
      showModalLogin: false
    };
    this.changeUserName = this.changeUserName.bind(this);
  }


  hundleSignOut() {
    const token = localStorage.getItem("token");
    signOutService
      .signOut(this.state.userName)
      .then(res => {
        if (res.data.deleted === "success") {
          localStorage.removeItem("token");
          this.setState({ userName: null });
        } else {
          console.log("not deleted");
        }
      })
      .catch(err => console.log(err));
  }


  changeUserName(userName) {
    //updates the page with the user
    this.setState({ userName });
  }

  componentDidMount() {
    //checks if the token is valid
    checkToken.checkAuth(window.localStorage.getItem("token")).then(res => {
      if (res) {
        this.changeUserName(res.data.name);
      }
    });
  }

  hundleShowSignUp() {
    this.setState({
      showModalSignUp: true
    });
  }
  hundleCloseSignUp() {
    this.setState({
      showModalSignUp: false
    });
  }
  hundleCloseLogin() {
    this.setState({
      showModalLogin: false
    });
  }
  hundleShowLogin() {
    this.setState({
      showModalLogin: true
    });
  }
  render() {
    return (
      <div>
        <Router>
          <SignUp
            showModal={this.state.showModalSignUp}
            onHide={() => {
              this.hundleCloseSignUp();
            }}
            changeUserName={this.changeUserName}
          />
          <LogIn
            showModal={this.state.showModalLogin}
            onHide={() => {
              this.hundleCloseLogin();
            }}
            changeUserName={this.changeUserName}
          />
          <Switch>

            <Navbar bg="light" expand="lg">
              <Navbar.Brand>RBK Auction</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {!this.state.userName ? (
                  <Nav className="mr-auto">
                    <Nav.Link
                      onClick={() => {
                        this.hundleShowSignUp();
                      }}
                    >
                      SignUp
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        this.hundleShowLogin();
                      }}
                    >
                      Login
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        this.hundleShowLogin();
                      }}
                    >
                      Home
                    </Nav.Link>
                  </Nav>
                ) : (
                  <Nav>
                    <Nav.Link
                      onClick={() => {
                        this.hundleSignOut();
                      }}
                    >
                      SignOut
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        this.hundleShowSignUp();
                      }}
                    >
                      {this.state.userName}
                    </Nav.Link>
                  </Nav>
                )}
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          </Switch>
          <NavbarCategory />
        </Router>

        <Home></Home>
      </div>
    );
  }
}

{
  /* <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {!this.state.userName ? (
                  <Route exact path="/">
                    <li>
                      <Button onClick={() => { this.hundleShowLogin() }} >Login</Button>
                      <Link to="/Login">LogIn</Link>
                    </li>
                    <li>
                      <Button onClick={() => { this.hundleShowSignUp() }} >signUp</Button>
                      <Link to="/SignUp">signUp</Link>
                    </li>
                    <div>not logged in</div>
                  </Route>
                ) : (
                    <div> {this.state.userName} </div>
                  )}
              </ul>
            </nav>


             <Route path="/SignUp" exact> <SignUp changeUserName={this.changeUserName} />  </Route>
            <Route path="/Login" exact> <LogIn changeUserName={this.changeUserName} />  </Route> 

          </div> */
}
export default App;

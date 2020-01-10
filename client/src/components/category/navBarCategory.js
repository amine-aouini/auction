import React from "react";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import categoryService from "../../services/categoryService.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";

class navBarCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: []
    };
  }
  componentDidMount() {
    this.hundleGetAllCategories();
  }
  hundleGetAllCategories() {
    categoryService.getAllCategories().then(res => {
      this.setState({
        categoryList: res.data
      });
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            {/* navbar category change the sticky top */}
            <Navbar sticky="top">
              <Navbar.Brand>Category</Navbar.Brand>
              <Nav className="mr-auto">
                {this.state.categoryList.map(cat => {
                  return <Nav.Link href="{cat.name}">{cat.name}</Nav.Link>;
                })}
              </Nav>
            </Navbar>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default navBarCategory;

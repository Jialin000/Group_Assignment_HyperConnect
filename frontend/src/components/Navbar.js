import React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

const NavBar = props => {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />{" "}
        HyperParking
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link href="/parkingBays">Find Parking Bays</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/users/login">Log in</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/users/signup">Sign up</NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

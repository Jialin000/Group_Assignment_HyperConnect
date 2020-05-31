import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import React from "react";
import { NavLink } from "react-router-dom";
import { userLogOut } from "../userAPI";
import {isAuthenticated} from "../userAPI";

const loggedIn = () => {
    return (
        <Nav >
            <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/">
                    <img
                        src="/navbarlogo.svg"
                        width="30"
                        height="20"
                        className="d-inline-block align-top"
                        alt=""
                    />{" "}
                    HyperParking
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/#/parkingBays">Find Parking Bays</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/#/users/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/" onClick={userLogOut}>LOGOUT</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Nav>
    );
}

const loggedOut = () => {
    return (
        <Nav>
            <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/">
                    <img
                        src="/navbarlogo.svg"
                        width="30"
                        height="20"
                        className="d-inline-block align-top"
                        alt=""
                    />{" "}
                    HyperParking
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/#/parkingBays">Find Parking Bays</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/#/users/login">LOGIN</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/#/users/signup">SIGN UP</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Nav>
    );
}







export default function NavBar() {
    if (isAuthenticated("Authorization")) {
        return (
            loggedIn());
    } else {
        return loggedOut();
    }
}




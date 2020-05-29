import React from "react";
import { NavLink } from "react-router-dom";
import { userLogOut } from "../userAPI";
import {isAuthenticated} from "../userAPI";

const loggedIn = () => {
    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/parkingBays">Find Parking Bays</NavLink>
            <NavLink to="/users/profile">PROFILE</NavLink>
            <NavLink to="/" onClick={userLogOut}>LOGOUT</NavLink>
        </nav>
    );
}

const loggedOut = () => {
    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/parkingBays">Find Parking Bays</NavLink>
            <NavLink to="/users/login">LOGIN</NavLink>
            <NavLink to="/users/signup">SIGN UP</NavLink>
        </nav>
    );
}




export default function Nav() {
  if (isAuthenticated("Authorization")) {
      return loggedIn();
  } else {
      return loggedOut();
  }
}



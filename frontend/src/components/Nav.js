import React from "react";
import { NavLink } from "react-router-dom";
import { userLogOut } from "../userAPI";

export default function Nav() {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/parkingBays">Find Parking Bays</NavLink>
      <NavLink to="/users/login">LOGIN</NavLink>
      <NavLink to="/users/signup">SIGN UP</NavLink>
    </nav>
  );
}

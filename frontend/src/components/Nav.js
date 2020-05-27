import React from "react";
import { NavLink } from "react-router-dom";
import { userLogOut } from "../userAPI";

export default function Nav() {
  return (
    <nav>
      <NavLink exact to="/HyperParking/">Home</NavLink>
      <NavLink to="/HyperParking/parkingBays">Find Parking Bays</NavLink>
      <NavLink to="/HyperParking/users/login">LOGIN</NavLink>
      <NavLink to="/users/signup">SIGN UP</NavLink>
      <NavLink to="/users/profile">PROFILE</NavLink>
      
    </nav>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import { userLogOut } from "../userAPI";

export default function Nav() {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/hyper-parking/parkingBays">Find Parking Bays</NavLink>
      <NavLink to="/hyper-parking/users/login">LOGIN</NavLink>
      <NavLink to="/hyper-parking/users/signup">SIGN UP</NavLink>
      
    </nav>
  );
}

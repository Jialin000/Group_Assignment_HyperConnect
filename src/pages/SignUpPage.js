import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm"
import "../styles.css"
import Button from "../components/Button";

export default function SignUpPage() {
  
  return (
    <div className="login_bg">
        <div className="login_box">
      <SignUpForm />
        </div>
    </div>    
  );
}

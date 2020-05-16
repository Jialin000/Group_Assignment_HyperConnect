import React from "react";
import SignInForm from "../components/SignInForm"
import Button from "../components/Button";
import "../styles.css"

export default function SignInPage() {
    return (
      <div className="login_bg">
          <div className="login_box">
             <SignInForm />
          </div>
      </div>
    );
  
}


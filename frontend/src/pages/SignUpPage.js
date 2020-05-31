import React from "react";
import SignUpForm from "../components/SignUpForm"
import "../styles.css"
import Button from "../components/Button";

export default function SignUpPage() {
  
  return (
    <div className="login_bg">
        <div className="login_box">
            <SignUpForm />

        </div>
        <div className="login_description">
            <h1>Sign up an account,
                <br/>you can save the locations as your favourites for later using.
            </h1>
        </div>

    </div>    
  );
}

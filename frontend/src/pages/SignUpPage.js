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
        <div className="userprofile_demo">
            <h1>After logging in,
            <br/>you can save the locations as your favourites for later using.
            </h1>

        </div>

    </div>    
  );
}

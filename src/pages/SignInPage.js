import React, { useUserLogIn } from "react";
import SignInForm from "../components/SignInForm"
import Button from "../components/Button";
import "../styles.css"

export default class SignInPage extends React.Component{
  
  render() {
    return (
      <div className="login_bg">
          <div className="login_box">
             <SignInForm />
          </div>
      </div>
    );
  }
}


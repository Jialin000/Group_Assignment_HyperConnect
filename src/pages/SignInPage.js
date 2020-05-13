import React, { useUserLogIn } from "react";
import SignInForm from "../components/SignInForm"
import Button from "../components/Button";

export default class SignInPage extends React.Component{
  
  render() {
    return (
      <div className="SignInPage">
       <SignInForm />
      </div>
    );
  }
}


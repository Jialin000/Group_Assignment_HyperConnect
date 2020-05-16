import React from "react";
import SignInForm from "../components/SignInForm"
import { isAuthenticated } from "../userAPI";

export default function SignInPage() {
  if (isAuthenticated('Authorization')){
    return (
      <div>
        you have already logged in!
      </div>
    );
  } else{ 
    return (
      <div className="SignInPage">
        <SignInForm />
      </div>
    );
  }
}

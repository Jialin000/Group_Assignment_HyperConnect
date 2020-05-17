import React from "react";
import SignInForm from "../components/SignInForm"

import { isAuthenticated } from "../userAPI";
import Button from "../components/Button";
import "../styles.css"

export default function SignInPage() {
    if (isAuthenticated('Authorization')){
        return (
            <div>
                you have already logged in!
            </div>
        );
    } else{
        return (
      <div className="login_bg">
          <div className="login_box">
             <SignInForm />
          </div>
      </div>
    );
  }
}


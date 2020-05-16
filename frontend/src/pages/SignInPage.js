import React from "react";
import SignInForm from "../components/SignInForm"
import { isAuthenticated, userLogInPage} from "../userAPI";

export default function SignInPage() {

  // get the login page
  // check if the user is logged in already or not
   
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


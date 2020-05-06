import React from "react";

import SignInForm from "../components/SignInForm"
import Button from "../components/Button"
export default function HomePage() {
  return (
    <div>
      <Button className={"btn-success"} onClick={event =>  window.location.href='/parkingBays'}>
          Find parking bays
      </Button>
    
		<h2>Log in to your account</h2>
		<SignInForm />
      <div>
        <h3>New to HyperParking?</h3>
        <Button className={"btn-success"} onClick={event =>  window.location.href='users/signup'}>
          Creat an accout
        </Button>
      </div>
    </div>
  );
}

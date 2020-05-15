import React from "react";

import SignInForm from "../components/SignInForm"
import Button from "../components/Button"
export default function HomePage() {
  return (
    <div>
      <Button className={"btn-success"} onClick={event =>  window.location.href='/parkingBays'}>
          Find parking bays
      </Button>
		
		<SignInForm />
    </div>
  );
}

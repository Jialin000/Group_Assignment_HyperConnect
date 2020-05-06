import React, { useState } from "react";

import Button from "../components/Button";

export default class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: null,
      errormessage: ''
    }
  }

  onSubmit() {
   // userLogin
  }
  render(){
    return (
      <div className="SignInForm">   
        <form>
          <label for="email">Enter your email:</label>
          <input type="email" id="email" name="email"/>

          <label for="password">Password:</label>
          <input type="password" id="password" name="password"/>   
        
          <Button className={"btn-success"} onClick={this.onSubmit}>
          Log In
          </Button>
        </form>
      </div>
      
    );
  }
}

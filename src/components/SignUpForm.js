import React, { useState } from "react";

import Button from "../components/Button";

export default class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: null,
      errormessage: ''
    }
  }
  Validation = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    /* 
    if (nam === "email") {
      if (val) {
        err = <strong>Enter a valid email address</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[nam]: val});*/
  }

  onSubmit() {
   // userSignUp
  }

  render(){
    return (
      <div className="SignUpForm">   
        <form>
          <label for="uname">User name:</label>
          <input type="text" id="uname" name="userName" onChange={this.Validation}/>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" onChange={this.Validation}/>

          <label for="password">Password:</label>
          <input type="password" id="password" name="password"/>
          
          <Button className={"btn-success"} onClick={this.onSubmit}>
          Sign up
          </Button>
        </form>
      </div>
    );
  }
}
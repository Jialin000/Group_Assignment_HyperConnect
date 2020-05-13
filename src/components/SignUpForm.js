import React, { useState } from "react";

import Button from "../components/Button";
import userSignUp from "../userAPI";

export default class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      errormessage: ''
    }
    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validate = (event) => {
    var re = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    
    if (!re.test(String(val))) {
      if (val) {
        err = <strong>The email address is not valid</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[nam]: val});
  }

  onSubmit() {
    userSignUp ({
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    });
  }

  render(){
    return (
      <div className="SignUpForm">   
        <form>
          <label for="uname">User name:</label>
          <input type="text" id="uname" name="userName" onChange={this.validate}/>
         
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" onChange={this.validate}/>
          {this.state.errormessage}
          
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
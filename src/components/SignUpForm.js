import React, { useState } from "react";

import Button from "../components/Button";


import userSignUp from "../userAPI";


export default class SignUpForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      errormessage:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail = (email_address) => {
    var re = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/; 
    return re.test(String(email_address));
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    let err = '';

    if (name === "email") {
      if (!this.validateEmail(value)) {
        err = <strong>The email address is not valid</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[name]: value});
    
  }

  handleSubmit(e) {
    e.preventDefault();
    userSignUp ({
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    });
    
  }

  

  

   

  render() {
    return (
        <div className={"SignUpForm"}>
          <form onSubmit={this.handleSubmit}>

              <label htmlFor="username">Username</label>
              <input type="username" id="username" name="username" value={this.state.username} onChange={this.handleChange} />
                <br/><br/>
              <label htmlFor="email">E-Mail Address</label>
              <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
              {this.state.errormessage}
                <br/><br/>
              <label htmlFor="password">Password</label>
              <input type="password" id="password"  name="password" value={this.state.password} onChange={this.handleChange} />
              <br/><br/>
            <Button className={"btn-success"}>Submit</Button>

          </form>
        </div>

    );
  }
}

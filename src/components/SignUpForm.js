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

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
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
<<<<<<< Updated upstream
          <form onSubmit={this.handleSubmit}>

              <label htmlFor="username">Username</label>
              <input type="username" id="username" name="username" value={this.state.username} onChange={this.handleChange} />
                <br/><br/>
              <label htmlFor="email">E-Mail Address</label>
              <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                <br/><br/>
              <label htmlFor="password">Password</label>
              <input type="password" id="password"  name="password" value={this.state.password} onChange={this.handleChange} />
              <br/><br/>
            <button className={"btn-success"}>Submit</button>

=======
          <h3>Sign Up</h3>
          <p>{this.state.signupmessage}</p>
          <form>
              <label htmlFor="username">Username:</label><br/>
              <input type="username" id="username" name="username" onChange={this.handleChange} placeholder={"Enter username here"} />
              <p>{this.state.errormessage.username}</p>

              <label htmlFor="email">Email:</label><br/>
              <input type="email" id="email" name="email" onChange={this.handleChange} placeholder={"Enter username here"} />
              <p>{this.state.errormessage.email}</p>
               
              <label htmlFor="password">Password:</label><br/>
              <input type="password" id="password"  name="password" onChange={this.handleChange} placeholder={"Enter password here"}/>
              <p>{this.state.errormessage.password}</p>
              
            <Button SubclassName={"btn-success"} onClick={this.onSubmit}>Submit</Button>
            <p>Already have an account?</p>
            <a href={'login'}> Sign In Here</a>
>>>>>>> Stashed changes
          </form>
        </div>

    );
  }
}

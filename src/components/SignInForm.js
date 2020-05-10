import React, { useState } from "react";
import Button from "../components/Button";

export default class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errormessage: ''
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

  console.log(this.state);
}
  static defaultProps = {
    action: '/users/login',
    method: 'POST'
  };


  render(){
    return (
      <div className="SignInForm">   
        <form onSubmit={this.handleSubmit} action={this.props.action} method={this.props.method}>

          <label htmlFor="email">Enter your email:</label>
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
            <br/><br/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
           <br/><br/>
          <button className={"btn-success"}>Log In</button>

        </form>
      </div>
    );
  }
}

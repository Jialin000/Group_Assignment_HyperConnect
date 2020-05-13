import React, { useState } from "react";
import Button from "../components/Button";
import useUserLogIn from "../userAPI";

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
  
validateEmail = (email_address) => {
    var re = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    return re.test(String(email_address));
 }

handleChange(e) {
  let target = e.target;
  let value = target.value;
  let name = target.name;
  
  if (name === "email") {
      if (!this.validateEmail(vale)) {
        err = <strong>The email address is not valid</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[nam]: val});

}

handleSubmit(e) {
  e.preventDefault();
  const { loading, res_code, error } = useUserLogIn({
     email: this.state.email,
     password: this.state.password
    });

    if (res_code == 200){
      alert ("Logged in");
    }
    else if (res_code == 401){
      let au_err = <strong>Authentication failed</strong>
      this.setState({authentication_err: au_err});
    }else {
      alert ("Error");
    }
  };


  render(){
    return (
      <div className="SignInForm">   
        <form onSubmit={this.handleSubmit} action={this.props.action} method={this.props.method}>

          <label htmlFor="email">Enter your email:</label>
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          <p>{this.state.errormessage}</p>
            <br/><br/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
           <br/><br/>
          <button className={"btn-success"}>Log In</button>

        </form>
       <p>{this.state.authentication_err}</p>
          
      </div>
      );
  }
     }

  
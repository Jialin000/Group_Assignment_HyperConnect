import React from "react";
import Button from "../components/Button";
import {userSignUp} from "../userAPI";

export default class SignUpForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      signupmessage:'',
      password: '',
      errormessage:{},
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // check if the email entered by the user is valid
  validateEmail = (email_address) => {
    let err = this.state.errormessage;
    var re = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    err["email"] = '';

    if (!email_address){
      err["email"] = "*Please enter your email";
      this.setState({err});
      return false;
     
    }else if (!re.test(String(email_address))) {
      err["email"] = "*Please enter a valid email";
      this.setState({err}); 
      return false;      
    }
    return true;
  }
  // check if the username entered by the user is valid
  validateUserName = (username) => {
    let err = this.state.errormessage;
    err["username"] = '';
    
    if (!username) {
      err["username"] = "*Please enter your username";
      this.setState({err});  
      return false;   
    }
    return true;
  }
  // check if the password entered by the user is valid
  validatePassword = (password) => {
    let err = this.state.errormessage;
    err["password"] = '';
    
    if (!password) {
      err["password"] = "*Please enter your password";
      this.setState({err});  
      return false;   
    }
    return true;
  }
  // validate each field of the form
  validateForm = () => {
    const isValidEmail = this.validateEmail(this.state.email) 
    const isValidPassword = this.validatePassword(this.state.password);
    const isValidUserName = this.validateUserName(this.state.username);
    return isValidEmail&&isValidPassword&&isValidUserName;
  }

  handleChange = (event) => {
    event.preventDefault(); 
    let nam = event.target.name;
    let val = event.target.value;

    if (nam === "username") {
      this.validateUserName(val);
    }
    else if (nam === "email") {
      this.validateEmail(val);
    }    
    else if (nam === "password") {
      this.validatePassword(val);
    }

    this.setState({[nam]: val});
  }
  // validate the form before submitting
  onSubmit = (event) => {
    event.preventDefault();

    if (!this.validateForm()){
      return;
    }

    this.setState({loginmessage: "Loading..."});
    userSignUp ({
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password   
    }).then(res => {
      if (res.status === 201) {
        this.setState({signupmessage: "Account created!"});
      }else if(res.status === 409) {
        this.setState({signupmessage: "This email has been registered."});
      }
      else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error registering please try again');
    });
    
   
  }


  render() {
    return (
        <div className={"SignUpForm"}>
          <h2>Sign Up</h2>
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
            <h5>Already have an account?</h5>
            <a href={'/#/user/login'}> Sign In Here</a>
          </form>
        </div>

    );
  }
}

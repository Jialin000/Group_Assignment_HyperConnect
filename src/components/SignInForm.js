import React from "react";

import Button from "../components/Button";
import userLogIn, {userLogOut} from "../userAPI";


export default class SignInForm extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      loginmessage:'',
      errormessage:{},
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

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

  validateForm = () => {
    const isValidEmail = this.validateEmail(this.state.email) 
    const isValidPassword = this.validatePassword(this.state.password);
    
    return isValidEmail&&isValidPassword;
  }

  handleChange = (event) => {
    event.preventDefault(); 
    let nam = event.target.name;
    let val = event.target.value;

    if (nam === "email") {
      this.validateEmail(val);
    }    
    else if (nam === "password") {
      this.validatePassword(val);
    }
    this.setState({[nam]: val});
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.validateForm()){
      return;
    }

    this.setState({loginmessage: "Loading..."});

    userLogIn ({
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if (res.status === 200) {
        this.setState({loginmessage: "Login successful!"});
      }else if(res.status === 401) {
        this.setState({loginmessage: "Wrong password or email"});
      }
      else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }


  render() {
    return (
        <div className={"SignInForm"}>
          <h2>Log in to your account</h2>
          <p>{this.state.loginmessage}</p>
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={this.handleChange}/>
            <p>{this.state.errormessage.email}</p>
             
            <label htmlFor="password">Password: </label>
            <input type="password" id="password"  name="password" onChange={this.handleChange}/>
            <p>{this.state.errormessage.password}</p>
              
            <Button SubclassName={"btn-success"} onClick={this.onSubmit}>Submit</Button>                   
          </form>

          <div>
            <h3>New to HyperParking?</h3>
            <Button className={"btn-success"} onClick={event =>  window.location.href='users/signup'}>
            Creat an accout
            </Button>
          </div>
        </div>

    );
  }
}
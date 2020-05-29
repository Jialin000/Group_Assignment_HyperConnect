import React from "react";
import userLogIn from "../userAPI";


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
  
  // validate each field
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

  // validate the form before submitting
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
        window.location.replace("/");
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
          <h1><b>Log In</b></h1>
          <div className="logo"></div>
          <p>{this.state.loginmessage}</p>
          <form>
            <label htmlFor="email">Email:</label><br/><br/>
            <input type="email" id="email" name="email" onChange={this.handleChange} placeholder={"Enter email here"}/>
            <p>{this.state.errormessage.email}</p>

            <label htmlFor="password">Password: </label><br/><br/>
            <input type="password" id="password"  name="password" onChange={this.handleChange} placeholder={"Enter password here"}/>
            <p>{this.state.errormessage.password}</p>

            <button className="btn" onClick={this.onSubmit}>Submit</button>

          </form>


          <div>
            <h5>Don't have an account?</h5>
            <a href={'/#/users/signup'}> Sign Up Here</a>
          </div>
        </div>

    );
  }
}


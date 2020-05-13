import React from "react";

import Button from "../components/Button";
import userLogIn from "../userAPI";



export default class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errormessage: '',
    }

    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }


  validateEmail = (email_address) => {
    var re = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    return re.test(String(email_address));
  }



  validate = (event) => { 
    let nam = event.target.name;
    let val = event.target.value;

    if (nam === "email") {
      let err = '';
      if (!this.validateEmail(val)) {
        err = <strong>The email address is not valid</strong>;
        this.setState({errormessage: err});
      }
    }
    this.setState({[nam]: val});
  }



  onSubmit = (event) => {
    userLogIn({
      email: this.state.email,
      password: this.state.password
    });
  }



  render(){
    return (
      <div className="SignInForm">  
        <form>
          <label for="email">Enter your email:</label>
          <input type="email" id="email" name="email" onChange={this.validate}/>

          <p>{this.state.errormessage}</p>

          <label for="password">Password:</label>
          <input type="password" id="password" name="password" onChange={this.validate}/> 
      
          <Button className={"btn-success"} onClick={this.onSubmit}>
          Log In
          </Button>

        </form>        

      </div>      

    );
  }
}
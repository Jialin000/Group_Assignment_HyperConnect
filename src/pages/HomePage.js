import React from "react";

import SignInForm from "../components/SignInForm"
import Button from "../components/Button"
import "../styles.css"

export default function HomePage() {
  return (
<<<<<<< Updated upstream
    <div>
      <Button className={"btn-success"} onClick={event =>  window.location.href='/parkingBays'}>
          Find parking bays
      </Button>
    
		<h2>Log in to your account</h2>
		<SignInForm />
      <div>
        <h3>New to HyperParking?</h3>
        <Button className={"btn-success"} onClick={event =>  window.location.href='users/signup'}>
          Creat an accout
        </Button>
      </div>
    </div>
=======
      <body className="homepage_container">
      <br/> <h1> Hyper Parking</h1><br/><br/>
      <div className = "homepage_upper">
          <div className = "homepage_left">
                <div>
                    {/*<h2>Welcome!</h2>*/}
                    <h2>Do you know that? <br/></h2>
                    <h3>There are more than
                         <h1>4300</h1>

                        on-street parkings in Melbourne! </h3><br/>
                </div>
              <div className="homepage_left_description">
                  <h3>Tried of wasting time looking for a parking bay?<br/><br/>
                      We are here to help! <br/><br/>
                      Click the button to start! <br/></h3>
              </div>
          </div>
          <div className = "homepage_right">
              <div className="homepage_right_login">
                  <SignInForm />
              </div>
          </div>
      </div>
      <div className="homepage_bottom">
          <Button className={"btn-success"} onClick={event =>  window.location.href='/parkingBays'}>
              Find parking bays
          </Button>

      </div>
      </body>
>>>>>>> Stashed changes
  );
}


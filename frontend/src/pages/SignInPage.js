import React from "react";
import SignInForm from "../components/SignInForm"
import { isAuthenticated } from "../userAPI";
import UserProfile from "../components/UserProfile";
import "../styles.css"

export default function SignInPage() {

        return (
      <div className="login_bg">
          <div className="login_box">

             <SignInForm />
          </div>
          <div className="userprofile_demo">
              <h1>After logging in,
                  <br/>you can save the locations as your favourites for later using.
              </h1>
              <UserProfile/>
          </div>
      </div>

    );
}

import React from "react";
import SignInForm from "../components/SignInForm"
import "../views/styles.css"

export default function SignInPage() {

        return (
            <div className="login_bg">
                <div className="login_box">
                    <SignInForm />
                </div>
                <div className="login_description">
                    <h1>After logging in,
                        <br/>you can save the locations as your favourites for later using.
                    </h1>
                </div>
            </div>

    );
}

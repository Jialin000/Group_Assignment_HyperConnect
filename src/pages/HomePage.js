import React from "react";

import SignInForm from "../components/SignInForm";
import Button from "../components/Button";
import "../styles.css";

export default function HomePage() {
  return (
    <body className="homepage_container">
      <br /> <h1> Hyper Parking</h1>
      <br />
      <div className="homepage_upper">
        <div className="homepage_left">
          <div>
            {/*<h2>Welcome!</h2>*/}
            <h2>
              Do you know that? <br />
            </h2>
            <h3>
              There are more than
              <h1>4300</h1>
              on-street parkings in Melbourne!{" "}
            </h3>
            <br />
          </div>
          <div className="homepage_left_description">
            <h3>
              Tired of wasting time looking for a parking bay?
              <br />
              <br />
              We are here to help! <br />
              <br />
              Click the{" "}
              <Button
                className={"btn-success"}
                onClick={(event) => (window.location.href = "/parkingBays")}
              >
                Button
              </Button>{" "}
              to start! <br />
            </h3>
          </div>
        </div>
        <div className="homepage_right">
          <div className="homepage_right_login">
            <SignInForm />
          </div>
        </div>
      </div>
    </body>
  );
}

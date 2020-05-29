import React from "react";
import SignInForm from "../components/SignInForm";
// import Button from "../components/Button";
import "../styles.css";
import {isAuthenticated, userLogOut} from "../userAPI";
import UserProfile from "../components/UserProfile";
import { Layout, Button } from 'antd';

export default function HomePage() {
  if (isAuthenticated('Authorization')){
    return(
  <div className="homepage_container">
    <body>


    <div className="main">




      <div>
        <br/><br/>
        <div className="homepage_upper">
          <header><h1 className="advice__title">Hyper Parking </h1></header>
          <div className="homepage_left">
            <div>
              <h1><b>
                Do you know that? <br />
              </b></h1>
              <h2>
                There are more than
                <h1><b><i>4300</i></b></h1>
                on-street parkings in Melbourne!{" "}
              </h2>
              <br />
            </div>
            <div className="homepage_left_description">
              <h2>
                Tired of wasting time
                <br/><br/>
                looking for a parking bay?
                <br /><br/>
                We are here to help!
                <br /><br />
                Click the
                <Button
                    className="btn"
                    onCdivck={(event) => (window.location.href = "/parkingBays")}
                >
                  Button
                </Button>
                to start! <br />
              </h2>
            </div>
          </div>
          <div className="homepage_right">
            <div className="homepage_right_login">
              <div className="homepage_right_userprofile">
                <UserProfile />
              </div>
            </div>
          </div>
        </div>

      </div>
      <section className="city-stuff">
        <ul className="skyscrappers__list">
          <div className="skyscrapper__item skyscrapper-1"></div>
          <div className="skyscrapper__item skyscrapper-2"></div>
          <div className="skyscrapper__item skyscrapper-3"></div>
          <div className="skyscrapper__item skyscrapper-4"></div>
          <div className="skyscrapper__item skyscrapper-5"></div>
        </ul>
        <ul className="tree__container">
          <div className="tree__list">
            <ul className="tree__item tree-1">
              <div className="tree__trunk"></div>
              <div className="tree__leaves"></div>
            </ul>
            <ul className="tree__item tree-2">
              <div className="tree__trunk"></div>
              <div className="tree__leaves"></div>
            </ul>
            <ul className="tree__item tree-3">
              <div className="tree__trunk"></div>
              <div className="tree__leaves"></div>
            </ul>
            <ul className="tree__item tree-4">
              <div className="tree__trunk"></div>
              <div className="tree__leaves"></div>
            </ul>
            <ul className="tree__item tree-5">
              <div className="tree__trunk"></div>
              <div className="tree__leaves"></div>
            </ul>
            <ul className="tree__item tree-6">
              <div className="tree__trunk"></div>
              <div className="tree__leaves"></div>
            </ul>
            <ul className="tree__item tree-7">
              <div className="tree__trunk"></div>
              <div className="tree__leaves"></div>
            </ul>
            <ul className="tree__item tree-8">
              <div className="tree__trunk"></div>
              <div className="tree__leaves"></div>
            </ul>
          </div>
        </ul>
        <ul className="crane__list crane-1">
          <div className="crane__item crane-cable crane-cable-1"></div>
          <div className="crane__item crane-cable crane-cable-2"></div>
          <div className="crane__item crane-cable crane-cable-3"></div>
          <div className="crane__item crane-stand"></div>
          <div className="crane__item crane-weight"></div>
          <div className="crane__item crane-cabin"></div>
          <div className="crane__item crane-arm"></div>
        </ul>
      </section>
    </div>
    </body>
  </div>
    )} else{
  return (

  <div className="homepage_container">
        <body>


        <div className="main">




          <div>
            <br/><br/>
            <div className="homepage_upper">
              <header><h1 className="advice__title">Hyper Parking </h1></header>
              <div className="homepage_left">
                <div>
                  <h1><b>
                    Do you know that? <br />
                  </b></h1>
                  <h2>
                    There are more than
                    <h1><b><i>4300</i></b></h1>
                    on-street parkings in Melbourne!{" "}
                  </h2>
                  <br />
                </div>
                <div className="homepage_left_description">
                  <h2>
                    Tired of wasting time
                    <br/><br/>
                  looking for a parking bay?
                    <br /><br/>
                    We are here to help!
                    <br /><br />
                    Click the
                    <Button
                        className="btn"
                        onCdivck={(event) => (window.location.href = "/parkingBays")}
                    >
                      Button
                    </Button>
                    to start! <br />
                  </h2>
                </div>
              </div>
              <div className="homepage_right">
                <div className="homepage_right_login">
                  <div className="homepage_right_userprofile">
                    <SignInForm />
                  </div>
                </div>
              </div>
            </div>

          </div>
          <section className="city-stuff">
            <ul className="skyscrappers__list">
              <div className="skyscrapper__item skyscrapper-1"></div>
              <div className="skyscrapper__item skyscrapper-2"></div>
              <div className="skyscrapper__item skyscrapper-3"></div>
              <div className="skyscrapper__item skyscrapper-4"></div>
              <div className="skyscrapper__item skyscrapper-5"></div>
            </ul>
            <ul className="tree__container">
              <div className="tree__list">
                <ul className="tree__item tree-1">
                  <div className="tree__trunk"></div>
                  <div className="tree__leaves"></div>
                </ul>
                <ul className="tree__item tree-2">
                  <div className="tree__trunk"></div>
                  <div className="tree__leaves"></div>
                </ul>
                <ul className="tree__item tree-3">
                  <div className="tree__trunk"></div>
                  <div className="tree__leaves"></div>
                </ul>
                <ul className="tree__item tree-4">
                  <div className="tree__trunk"></div>
                  <div className="tree__leaves"></div>
                </ul>
                <ul className="tree__item tree-5">
                  <div className="tree__trunk"></div>
                  <div className="tree__leaves"></div>
                </ul>
                <ul className="tree__item tree-6">
                  <div className="tree__trunk"></div>
                  <div className="tree__leaves"></div>
                </ul>
                <ul className="tree__item tree-7">
                  <div className="tree__trunk"></div>
                  <div className="tree__leaves"></div>
                </ul>
                <ul className="tree__item tree-8">
                  <div className="tree__trunk"></div>
                  <div className="tree__leaves"></div>
                </ul>
              </div>
            </ul>
            <ul className="crane__list crane-1">
              <div className="crane__item crane-cable crane-cable-1"></div>
              <div className="crane__item crane-cable crane-cable-2"></div>
              <div className="crane__item crane-cable crane-cable-3"></div>
              <div className="crane__item crane-stand"></div>
              <div className="crane__item crane-weight"></div>
              <div className="crane__item crane-cabin"></div>
              <div className="crane__item crane-arm"></div>
            </ul>
          </section>
        </div>
        </body>
  </div>

  );
};
}

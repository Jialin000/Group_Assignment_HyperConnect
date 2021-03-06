import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./views/styles.css";

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <Nav />
    
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/users/login">
            <SignInPage />
          </Route>
          <Route path="/users/signup">
            <SignUpPage />
          </Route>
          <Route path="/parkingBays">
            <SearchPage />
          </Route>
          <Route path="/users/profile">
            <UserPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
        
      </div>
    </HashRouter>
  );
}


import React from "react";
import { BrowserRouter, Switch, Route, HashRouter} from "react-router-dom";

import NavBar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavBar />
    
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
        </Switch>
        
      </div>
    </HashRouter>
  );
}


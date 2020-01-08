import React from "react";
import "./App.css";

import NavBar from "./components/NavBar";

import SignIn from "./components/user-onboarding/SignIn";
import Register from "./components/user-register/Register";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/WelcomePage";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />

      {/* ROUTING */}
      <Route exact path="/" render={props => <WelcomePage />} />
      <Route path="/dashboard" render={props => <Dashboard {...props} />} />
      <Route path="/login" render={props => <SignIn />} />
      <Route path="/signup" render={props => <Register />} />
      {/* <Route exact path="/" render={props => }/> */}
    </div>
  );
}

export default App;

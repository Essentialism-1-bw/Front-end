import React from "react";
import "./App.css";

import NavBar from "./components/NavBar";

import SignIn from "./components/user-onboarding/SignIn";
import Register from "./components/user-register/Register";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/WelcomePage";
import { Route } from "react-router-dom";
import PrivateRoute from "./Authentication/PrivateRoute";

import AnimatedSwitch from './components/AnimatedSwitch'

function App() {
  return (
    <div className="App">
      <NavBar />

      {/* ROUTING */}
      <AnimatedSwitch animationClassName="page-slide" animationTimeout={300}>
        <PrivateRoute path="/welcome">
          <WelcomePage />
        </PrivateRoute>
        {/* <Route exact path="/" render={props => <WelcomePage />} /> */}
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        {/* <Route path="/dashboard" render={props => <Dashboard {...props} />} /> */}
        <Route exact path="/" render={props => <SignIn />} />
        <Route path="/signup" render={props => <Register />} />
        {/* <Route exact path="/" render={props => }/> */}
      </AnimatedSwitch>
    </div>
  );
}

export default App;

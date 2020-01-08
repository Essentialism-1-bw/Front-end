import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      localStorage.getItem("token") !== null ? (
        children
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )
    }
  />
);
export default PrivateRoute;

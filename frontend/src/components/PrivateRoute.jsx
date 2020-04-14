import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/Auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referrer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;

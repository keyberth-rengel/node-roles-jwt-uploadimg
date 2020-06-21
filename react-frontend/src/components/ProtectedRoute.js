import React from "react";
import { Route, Redirect } from "react-router-dom";
import ResponsiveDrawer from "./ResponsiveDrawer";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <ResponsiveDrawer>
            <Component {...props} />
          </ResponsiveDrawer>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;

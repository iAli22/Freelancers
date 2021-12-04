import React from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, withRouter } from "react-router-dom";
function PrivateRoute({ component: Component, isLogin, ...rest }) {
  const { i18n } = useTranslation();

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") &&
        localStorage.getItem("tokenScopes") === "full-scope" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/${i18n.language}/login`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default withRouter(PrivateRoute);

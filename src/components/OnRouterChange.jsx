import React from "react";
import ReactGA from "react-ga";
import { withRouter } from "react-router-dom";
ReactGA.initialize("G-D7SCV3Q55Y");

const OnRouterChange = ({ history }) => {
  history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return <></>;
};

export default withRouter(OnRouterChange);

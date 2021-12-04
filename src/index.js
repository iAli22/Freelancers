import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import "./i18n";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

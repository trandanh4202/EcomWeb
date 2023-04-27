import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Redux/store";
// import { BrowserRouter, Route,  } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ReactDOM from "react-dom";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

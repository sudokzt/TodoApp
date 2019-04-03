import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import Task from "./containers/Task";
import createStore from "./store";

import * as serviceWorker from "./serviceWorker";

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <Task />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

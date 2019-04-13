import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import Task from "./containers/Task";
import LoginButton from "./components/Login";
import createStore from "./store";

import * as serviceWorker from "./serviceWorker";

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <Task />
    <LoginButton />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

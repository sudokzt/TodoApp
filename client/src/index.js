import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import Header from "./containers/Header";
import Task from "./containers/Task";
import createStore from "./store";
import "./firebase/config";

import * as serviceWorker from "./serviceWorker";

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <Header />
    <Task />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

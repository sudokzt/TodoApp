import {
  createStore as reducerCreateStore,
  applyMiddleware,
  combineReducers
} from "redux";
import logger from "redux-logger"; // デバッグ時に使う
import thunk from "redux-thunk";

import taskReducer from "../reducers/Task";
import authReducer from "../reducers/Auth";

// ローカルストレージにタスク状態を保存するためのmiddleware
const storageMiddleware = store => next => action => {
  const result = next(action);
  localStorage.setItem("app-state", JSON.stringify(store.getState().task));
  return result;
};

// store生成
export default function createStore() {
  const savedTaskState = JSON.parse(localStorage.getItem("app-state"));
  return reducerCreateStore(
    combineReducers({ task: taskReducer, auth: authReducer }),
    applyMiddleware(logger, thunk, storageMiddleware)
  );
}

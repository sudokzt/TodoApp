import { createStore as reducerCreateStore, applyMiddleware } from "redux";
// import logger from "redux-logger"; // デバッグ時に使う

import reducer from "../reducers/reducer";

// ローカルストレージにタスク状態を保存するためのmiddleware
const storageMiddleware = store => next => action => {
  const result = next(action);
  localStorage.setItem("app-state", JSON.stringify(store.getState()));
  return result;
};

// store生成
export default function createStore() {
  const savedState = JSON.parse(localStorage.getItem("app-state"));
  return reducerCreateStore(
    reducer,
    savedState ? savedState : reducer(undefined, { type: "INIT" }),
    applyMiddleware(storageMiddleware)
  );
}

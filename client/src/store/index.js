import {
  createStore as reducerCreateStore,
  applyMiddleware,
  combineReducers
} from "redux";
import logger from "redux-logger"; // デバッグ時に使う
import thunk from "redux-thunk";

import taskReducer from "../reducers/Task";
import authReducer from "../reducers/Auth";

// store生成
export default function createStore() {
  return reducerCreateStore(
    combineReducers({ task: taskReducer, auth: authReducer }),
    applyMiddleware(logger, thunk)
  );
}

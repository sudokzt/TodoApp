import { LOGIN, LOGOUT, LOGIN_START, LOGIN_FINISH } from "../constants/Auth";

const initialState = {
  uid: null,
  displayName: null,
  photoURL: null,
  loginning: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      if (action.payload.uid) {
        return {
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL,
          loginning: false
        };
      } else {
        return {
          ...state,
          loginning: false
        };
      }
    case LOGOUT:
      return {
        uid: null,
        displayName: null,
        photoURL: null,
        loginning: false
      };
    case LOGIN_START:
      return {
        ...state,
        loginning: true
      };
    case LOGIN_FINISH:
      return {
        ...state,
        loginning: false
      };
    default:
      return state;
  }
}

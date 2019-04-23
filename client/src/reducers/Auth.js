import { LOGIN, LOGOUT } from "../constants/Auth";

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
        photoURL: null
      };
    case "LOGIN_START":
      return {
        ...state,
        loginning: false
      };
    case "LOGIN_FINISH":
      return {
        ...state,
        loginning: true
      };
    default:
      return state;
  }
}

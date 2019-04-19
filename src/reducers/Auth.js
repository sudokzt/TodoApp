import { LOGIN, LOGOUT } from "../constants/Auth";

const initialState = {
  uid: null,
  displayName: null,
  photoURL: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      if (action.payload.uid) {
        return {
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL
        };
      } else {
        return state;
      }
    case LOGOUT:
      return {
        uid: null,
        displayName: null,
        photoURL: null
      };
    default:
      return state;
  }
}

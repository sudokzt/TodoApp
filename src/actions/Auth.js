import { LOGIN, LOGOUT } from "../constants/Auth";

import firebase from "../config";

const loginResult = async () => {
  // リダイレクトした時の結果を取得
  let user = {};
  await firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        const token = (user["token"] = result.credential.accessToken);
        const secretKey = (user["secretKey"] = result.credential.secret);
        console.log({ token, secretKey });
      }
      if (result.user) {
        // The signed-in user info.
        user["name"] = result.user.displayName;
        user["uid"] = result.user.uid;
      }
    });
  return user;
};

export const loginOk = () => {
  return dispatch => {
    loginResult()
      .then(user => dispatch(login(user)))
      .catch(e => console.log({ e }));
  };
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(res => {
      console.log({
        success: res
      });
    })
    .catch(function(error) {
      console.log({
        error
      });
    });
  return {
    type: LOGOUT
  };
};

const login = user => ({
  type: LOGIN,
  payload: {
    uid: user.uid,
    displayName: user.name,
    token: user.token,
    secretKey: user.secretKey
  }
});

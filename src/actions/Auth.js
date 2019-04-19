import { LOGIN, LOGOUT } from "../constants/Auth";

import firebase, { firebaseDb } from "../firebase";

const loginResult = async () => {
  // リダイレクトした時の結果を取得
  let user = {};
  await firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        user["token"] = result.credential.accessToken;
        user["secretKey"] = result.credential.secret;
      }
      if (result.user) {
        // The signed-in user info.
        user["name"] = result.user.displayName;
        user["uid"] = result.user.uid;
        user["photoURL"] = result.user.photoURL;
      }
      return user;
    })
    .then(user => {
      // Firebase DB に ユーザーを追加(既にログイン中だったら更新)
      const ref = firebaseDb.ref("users/" + user.uid);
      ref.set({
        name: user.name,
        token: user.token,
        secretKey: user.secretKey,
        photoURL: user.photoURL
      });
      return "ok";
    });
  return user;
};

export const loginOk = () => {
  return dispatch => {
    loginResult()
      .then(user => {
        // firebase
        dispatch(login(user));
      })
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
    secretKey: user.secretKey,
    photoURL: user.photoURL
  }
});

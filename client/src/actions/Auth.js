import { LOGIN, LOGOUT } from "../constants/Auth";

import firebase, { firebaseDb } from "../firebase";

const loginResult = async () => {
  // リダイレクトした時の結果を取得
  const userInfo = await firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      let user = {}; // twitterユーザーアカウント
      if (result.credential) {
        user["token"] = result.credential.accessToken;
        user["secretKey"] = result.credential.secret;
      }
      if (result.user) {
        // The signed-in user info.
        user["displayName"] = result.user.displayName;
        user["uid"] = result.user.uid;
        user["photoURL"] = result.user.photoURL;
      }
      return user;
    })
    .then(user => {
      // Firebase DB に ユーザーを追加(既にログイン中だったら更新)
      const ref = firebaseDb.ref("users/" + user.uid);
      ref.set({
        uid: user.uid,
        displayName: user.displayName,
        token: user.token,
        secretKey: user.secretKey,
        photoURL: user.photoURL
      });
      return user;
    });
  return userInfo;
};

export const loginOk = () => {
  return dispatch => {
    // ログインをしている場合は、ログイン情報を取得
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // ログインボタンを押した後のリダイレクトだったら、その情報をDBに登録(初回ログイン時)(リロード時)
        if (
          document.referrer === "" &&
          window.performance.navigation.type !== 1
        ) {
          // ログインをしていない場合は、その情報をDBに登録
          loginResult()
            .then(user => dispatch(login(user)))
            .catch(e => console.log({ e }));
        } else {
          dispatch(login(user));
        }
      }
    });
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

const login = user => {
  return {
    type: LOGIN,
    payload: {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
  };
};

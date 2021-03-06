import { LOGIN, LOGOUT, LOGIN_START, LOGIN_FINISH } from "../constants/Auth";

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

// ログインを開始したことをストアに保存します
const loginStart = () => ({ type: LOGIN_START });
// ログインを終了したことをストアに保存します
const loginFinish = () => ({ type: LOGIN_FINISH });

export const loginOk = () => {
  return async dispatch => {
    dispatch(loginStart());
    // 既にログインをしている（セッション保持をされている）場合は、ログイン情報を取得
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
      dispatch(loginFinish());
    });
  };
};

// ログインアクションクリエーター
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
// ログアウトアクションクリエーター
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

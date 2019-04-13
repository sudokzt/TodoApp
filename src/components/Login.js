import React from "react";

import firebase, { providerTwitter } from "../config";

const handleLoginButton = () => {
  // リダイレクトにてTwitterログイン画面を開く
  firebase.auth().signInWithRedirect(providerTwitter);

  // リダイレクトした時の結果を取得
  firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const token = result.credential.accessToken;
        const secret = result.credential.secret;
        // ...
        console.log({ token, secret });
      }
      // The signed-in user info.
      const user = result.user;
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
};

export default function LoginButton() {
  return (
    <div>
      <button id="login-button" onClick={() => handleLoginButton()}>
        ログインボタン
      </button>
      <button
        onClick={firebase.auth().onAuthStateChanged(user => {
          let name, email, photoUrl, uid, emailVerified, token;
          if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            token = user.getIdToken();
          }
          console.log({ name, email, photoUrl, uid, emailVerified, token });
        })}
      >
        確認
      </button>
    </div>
  );
}

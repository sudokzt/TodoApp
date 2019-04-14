import React, { Component } from "react";

import firebase, { providerTwitter } from "../config";

// ログインハンドラー
const handleLoginButton = () => {
  // リダイレクトにてTwitterログイン画面を開く
  firebase.auth().signInWithRedirect(providerTwitter);
};

export default class LoginButton extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div>
        {!this.props.uid ? (
          <button id="login-button" onClick={() => handleLoginButton()}>
            ログイン
          </button>
        ) : (
          <button id="logout-button" onClick={() => this.props.logout()}>
            ログアウト
          </button>
        )}
        <button
          onClick={() => {
            firebase
              .auth()
              .onAuthStateChanged(user => {
                let name, email, photoUrl, uid, emailVerified;
                if (user != null) {
                  name = user.displayName;
                  email = user.email;
                  photoUrl = user.photoURL;
                  emailVerified = user.emailVerified;
                  uid = user.uid;
                  console.log(user);
                }
              })
              .catch(function(error) {
                // Handle error
                console.log({ error });
              });
          }}
        >
          ユーザー確認
        </button>
      </div>
    );
  }
}

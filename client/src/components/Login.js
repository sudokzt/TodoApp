import React, { Component } from "react";

import firebase, { providerTwitter } from "../firebase/";

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
    if (this.props.loginning) {
      return <div>...読み込み中</div>;
    } else {
      return (
        <div>
          {!this.props.uid ? (
            <button id="login-button" onClick={() => handleLoginButton()}>
              ログイン
            </button>
          ) : (
            <section>
              <img alt="アイコン" src={this.props.photoURL} />
              <span>{this.props.displayName}</span>
              <button id="logout-button" onClick={() => this.props.logout()}>
                ログアウト
              </button>
            </section>
          )}
        </div>
      );
    }
  }
}

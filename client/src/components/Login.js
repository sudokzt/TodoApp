import React, { Component } from "react";

import firebase, { providerTwitter } from "../firebase/";

import style from "../css/Login.module.css";

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
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <div
                className={style.login__button}
                onClick={() => handleLoginButton()}
              >
                ログイン
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <div
                className={style.login__button}
                onClick={() => this.props.logout()}
              >
                ログアウト
              </div>
              <div>
                <img
                  className={style.myIcon}
                  alt="アイコン"
                  src={this.props.photoURL}
                />
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

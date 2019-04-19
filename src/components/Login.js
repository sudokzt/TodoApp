import React, { Component } from "react";

import firebase, { providerTwitter } from "../firebase/";

// twitter API APPの各キーを取得
const REACT_APP_TWITTER_CUTOMER_SECRET_KEY =
  process.env.REACT_APP_TWITTER_CUTOMER_SECRET_KEY;
const REACT_APP_TWITTER_CUSTOMER_KEY =
  process.env.REACT_APP_TWITTER_CUSTOMER_KEY;

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
        <button
          onClick={() => {
            const twitter = require("twitter");

            const test = {
              consumer_key: REACT_APP_TWITTER_CUSTOMER_KEY,
              consumer_secret: REACT_APP_TWITTER_CUTOMER_SECRET_KEY,
              access_token_key: "",
              access_token_secret: ""
            };

            const client = new twitter(test);
            client.post(
              `statuses/update`,
              { status: "ツイートしたい内容" },
              function(error, tweet, response) {
                if (!error) {
                  console.log(tweet);
                } else {
                  console.log(error);
                }
              }
            );
          }}
        >
          テスト
        </button>
      </div>
    );
  }
}

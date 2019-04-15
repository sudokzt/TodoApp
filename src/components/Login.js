import React, { Component } from "react";

import firebase, { providerTwitter } from "../config";

const TWITTER_CUTOMER_SECRET_KEY = process.env.TWITTER_CUTOMER_SECRET_KEY;
const TWITTER_CUSTOMER_KEY = process.env.TWITTER_CUSTOMER_KEY;

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
              consumer_key: TWITTER_CUSTOMER_KEY,
              consumer_secret: TWITTER_CUTOMER_SECRET_KEY,
              access_token_key:
                "847735307696955392-lf9IFJ0Kip2tRU4wFmk1ea9ZQQzO6WG",
              access_token_secret:
                "caGrSNdemt3C8MF7LFFSqlOe0jBSTVEux3CWNN85nSYl4"
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

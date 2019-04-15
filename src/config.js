import firebase from "firebase/app";
import "firebase/firestore"; //firestoreを使う場合
import "firebase/auth";

const API_KEY = process.env.API_KEY;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL;
const PROJECT_ID = process.env.PROJECT_ID;
const STORAGE_BUCKET = process.env.STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

export const providerTwitter = new firebase.auth.TwitterAuthProvider();
// export const db = firebase.firestore(); //firestroeを使う場合
export default firebase;

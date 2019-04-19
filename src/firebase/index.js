import firebase from "firebase/app";
import "firebase/firestore"; //firestoreを使う場合
import "firebase/auth";
import "firebase/database";

import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);

export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const firebaseDb = firebase.database();
export default firebase;

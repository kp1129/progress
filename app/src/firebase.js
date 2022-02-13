import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB8EOszTt7pKZw-T2fmM_xqopBag35c6g",
  authDomain: "progress-ad37f.firebaseapp.com",
  projectId: "progress-ad37f",
  storageBucket: "progress-ad37f.appspot.com",
  messagingSenderId: "163993861096",
  appId: "1:163993861096:web:13b32f2b11ab0e7294825d",
  measurementId: "G-PWJVML0CJR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

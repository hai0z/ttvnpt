import { initializeApp } from "firebase/app";
import * as auth from "firebase/auth";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNF8_raM7G2dDCyoSQomXY_2jdNmjZr-k",
    authDomain: "vnpt-9452a.firebaseapp.com",
    projectId: "vnpt-9452a",
    storageBucket: "vnpt-9452a.appspot.com",
    messagingSenderId: "441923760097",
    appId: "1:441923760097:web:73e92b3c287bcb501deca0",
    measurementId: "G-LW1QY814WP",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = auth;
const db = firestore;

export { firebaseAuth, db };
export default firebaseApp;

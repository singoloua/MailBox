// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvX6EmdsAu14qZT6CRPtgYXnbeBroMJMc",
    authDomain: "inbox-5b352.firebaseapp.com",
    projectId: "inbox-5b352",
    storageBucket: "inbox-5b352.appspot.com",
    messagingSenderId: "197329593994",
    appId: "1:197329593994:web:70ea2ba8ea1ee7b6e6ef73",
    measurementId: "G-DDN1RB9KQ0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
const analytics = getAnalytics(app);
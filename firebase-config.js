// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1fFPOd34q_tZMcHhdTxTaHDKcdCf0ZKA",
  authDomain: "threads-copia.firebaseapp.com",
  projectId: "threads-copia",
  storageBucket: "threads-copia.firebasestorage.app",
  messagingSenderId: "235710955840",
  appId: "1:235710955840:web:05ce161d014c8faa557aa5",
  measurementId: "G-WXD7TCCH6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

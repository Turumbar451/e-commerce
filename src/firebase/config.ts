// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/*No usar por el momento ya que no se va
 import { getAnalytics } from "firebase/analytics"; */
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6vK0sRaaZXxlfGtkfSYBCSZWejx-b7RQ",
  authDomain: "e-commerce-35968.firebaseapp.com",
  projectId: "e-commerce-35968",
  storageBucket: "e-commerce-35968.firebasestorage.app",
  messagingSenderId: "123912047747",
  appId: "1:123912047747:web:ab9bc349941352386f5fb6",
  measurementId: "G-EVLFFWP1EB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
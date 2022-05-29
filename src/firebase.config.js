// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFireStore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeN__JhDJBbl18nAbbqOM1ALnCWDQwBD4",
  authDomain: "house-marketplace-app-8bd25.firebaseapp.com",
  projectId: "house-marketplace-app-8bd25",
  storageBucket: "house-marketplace-app-8bd25.appspot.com",
  messagingSenderId: "408567189327",
  appId: "1:408567189327:web:906019b0f9f6e45792ff3a",
  measurementId: "G-1K7SV36ZRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()
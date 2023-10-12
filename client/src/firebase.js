// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "articrafts-50f4d.firebaseapp.com",
  projectId: "articrafts-50f4d",
  storageBucket: "articrafts-50f4d.appspot.com",
  messagingSenderId: "297328107084",
  appId: "1:297328107084:web:5212409d68c52464a45ee9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
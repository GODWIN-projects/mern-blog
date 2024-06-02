// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f63d9.firebaseapp.com",
  projectId: "mern-blog-f63d9",
  storageBucket: "mern-blog-f63d9.appspot.com",
  messagingSenderId: "1739256767",
  appId: "1:1739256767:web:d5cf42d2091729e1d0a70a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore (cloud database)
import { getAuth } from "firebase/auth"; // Firebase Authentication (if needed)

// Your Firebase configuration (copy this from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBym1DRFJ4IaKKHkyEjnyNGqLCKYFc2rv4",
  authDomain: "easy-paste-ce2be.firebaseapp.com",
  projectId: "easy-paste-ce2be",
  storageBucket: "easy-paste-ce2be.firebasestorage.app",
  messagingSenderId: "1084263657353",
  appId: "1:1084263657353:web:317f9c73c1cb27dcaf7b58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services you want to use in your app
export const db = getFirestore(app); // Firestore database
export const auth = getAuth(app); // Firebase authentication (if needed)

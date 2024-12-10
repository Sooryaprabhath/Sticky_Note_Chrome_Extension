// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Firebase Authentication (if needed)

// Your Firebase configuration (copy this from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBym1DRFJ4IaKKHkyEjnyNGqLCKYFc2rv4",
  authDomain: "easy-paste-ce2be.firebaseapp.com",
  projectId: "easy-paste-ce2be",
  storageBucket: "easy-paste-ce2be.firebasestorage.app",
  messagingSenderId: "1084263657353",
  appId: "1:1084263657353:web:317f9c73c1cb27dcaf7b58",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();

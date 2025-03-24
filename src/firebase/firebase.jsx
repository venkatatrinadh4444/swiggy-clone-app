// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXvvG1rwjY8erGejsCK0IaTaKto2hYoqY",
  authDomain: "swiggy-clone-2b57d.firebaseapp.com",
  projectId: "swiggy-clone-2b57d",
  storageBucket: "swiggy-clone-2b57d.firebasestorage.app",
  messagingSenderId: "388943954943",
  appId: "1:388943954943:web:06661190b1db2594065dca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore=getFirestore(app)
const auth=getAuth(app)
const googleProvider=new GoogleAuthProvider()

export {firestore,auth,googleProvider}
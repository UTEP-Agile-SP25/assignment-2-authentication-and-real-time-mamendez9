// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoePVtQEHU2BjIk16NgV5P1Lid9jnF6hY",
    authDomain: "mendez-sandbox.firebaseapp.com",
    projectId: "mendez-sandbox",
    storageBucket: "mendez-sandbox.firebasestorage.app",
    messagingSenderId: "121890772684",
    appId: "1:121890772684:web:5d148c3682e664073d5469"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
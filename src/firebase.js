// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // ✅ ADD THIS LINE
import { getAuth } from "firebase/auth";         // ✅ ADD THIS LINE IF AUTH USED

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9q6B5EqocOgOd4Ae-TqYD6rlTF_cSZRM",
  authDomain: "canteen-311d9.firebaseapp.com",
  databaseURL: "https://canteen-311d9-default-rtdb.firebaseio.com", // <--- ADD THIS
  projectId: "canteen-311d9",
  storageBucket: "canteen-311d9.firebasestorage.app",
  messagingSenderId: "177023432580",
  appId: "1:177023432580:web:6641110e9d2e8c81994fd1",
  measurementId: "G-0JDGLSSB37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);   // ✅ ADD THIS LINE
export const auth = getAuth(app);           // ✅ ADD THIS LINE IF AUTH USED
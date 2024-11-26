// src/firebase/firebaseConfig.jsx

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {
  apiKey: "AIzaSyAsOo8Z83jXJNhP46fp2w2_ao28ik9kiWI",
  authDomain: "slushie-bdf60.firebaseapp.com",
  projectId: "slushie-bdf60",
  storageBucket: "slushie-bdf60.firebasestorage.app",
  messagingSenderId: "192304780991",
  appId: "1:192304780991:web:387c81896bacea3016580a",
  measurementId: "G-XRM0K39ZM6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);  
const db = getFirestore(app);  

export { auth, db };  

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const apiKey= import.meta.env.REACT_APP_FIRBASE_APIKEY

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:apiKey,
    authDomain: "task-manager-8e22f.firebaseapp.com",
    projectId: "task-manager-8e22f",
    storageBucket: "task-manager-8e22f.firebasestorage.app",
    messagingSenderId: "807753028578",
    appId: "1:807753028578:web:ac0bb9c4578c216accdfbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJo986CWcvlFPMr0Zb-CtbJvd0uUuzFXU",
  authDomain: "evidance-website.firebaseapp.com",
  projectId: "evidance-website",
  storageBucket: "evidance-website.firebasestorage.app",
  messagingSenderId: "581169379751",
  appId: "1:581169379751:web:0a4e16d173584817299e82",
  measurementId: "G-2LGHG2JZ0Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

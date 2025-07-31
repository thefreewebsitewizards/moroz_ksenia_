// config/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCDy5hBMFfqzWQinV0sLLZAFh8koVZE5Qk",
  authDomain: "ksenia-munoz.firebaseapp.com",
  projectId: "ksenia-munoz",
  storageBucket: "ksenia-munoz.firebasestorage.app",
  messagingSenderId: "982189236395",
  appId: "1:982189236395:web:594648694ec020153f17ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
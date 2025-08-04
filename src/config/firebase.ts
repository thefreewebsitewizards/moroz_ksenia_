// Firebase configuration for React app
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDy5hBMFfqzWQinV0sLLZAFh8koVZE5Qk",
  authDomain: "ksenia-munoz.firebaseapp.com",
  projectId: "ksenia-munoz",
  storageBucket: "ksenia-munoz.appspot.com",
  messagingSenderId: "982189236395",
  appId: "1:982189236395:web:594648694ec020153f17ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
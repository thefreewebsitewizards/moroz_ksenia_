// backend/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

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

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore and collections you use
const UserCollection = collection(db, 'Users');

export { db, UserCollection };

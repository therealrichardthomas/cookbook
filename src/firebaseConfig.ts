import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Paste your Firebase config object here from the README.md
//       to replace this placeholder below
const firebaseConfig = {
  apiKey: "replaceme",
  authDomain: "replaceme",
  projectId: "replaceme",
  storageBucket: "replaceme",
  messagingSenderId: "replaceme",
  appId: "replaceme",
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the database
const db = getFirestore(app);

export { db };

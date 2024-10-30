// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkrs0qnKvYcJaaYF-PsRam36tLD5DIreU",
  authDomain: "pesatrak.firebaseapp.com",
  projectId: "pesatrak",
  storageBucket: "pesatrak.appspot.com",
  messagingSenderId: "666968942928",
  appId: "1:666968942928:web:c1d73a2d848bbbd627a455",
  measurementId: "G-2CK3LH2SYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app); // Use getAuth to initialize auth

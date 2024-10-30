// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
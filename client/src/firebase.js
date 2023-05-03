import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCaTcsdt5s5PatHWxP74vSg7cIrsnKw7-I",
  authDomain: "lummaotube.firebaseapp.com",
  projectId: "lummaotube",
  storageBucket: "lummaotube.appspot.com",
  messagingSenderId: "969948561226",
  appId: "1:969948561226:web:6897bd0b92f06ce1220bb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()

export default app;
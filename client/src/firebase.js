import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: `${process.env.apiKey}`,
  authDomain: "lummaotube.firebaseapp.com",
  projectId: "lummaotube",
  storageBucket: "lummaotube.appspot.com",
  messagingSenderId: `${process.env.message}`,
  appId: `${process.env.appId}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()

export default app;
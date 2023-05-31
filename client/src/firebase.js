import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APIKEY}`,
  authDomain: "lummaotube.firebaseapp.com",
  projectId: "lummaotube",
  storageBucket: "lummaotube.appspot.com",
  messagingSenderId: `${process.env.REACT_APP_MESSAGE}`,
  appId: `${process.env.REACT_APP_APPID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()

export default app;
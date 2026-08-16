import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiamniJMeh3tX-S1B-fmjbKTUYJWdDblI",
  authDomain: "amogh-rail.firebaseapp.com",
  projectId: "amogh-rail",
  storageBucket: "amogh-rail.firebasestorage.app",
  messagingSenderId: "890207295156",
  appId: "1:890207295156:web:805445a1a5e08cb81ae9e1",
  measurementId: "G-L59MHHE2QH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;

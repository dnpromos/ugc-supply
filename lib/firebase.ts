import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHUKHCdXT-baqPJ6HBjMpTnE_RXPX73-Y",
  authDomain: "ugc-supply.firebaseapp.com",
  projectId: "ugc-supply",
  storageBucket: "ugc-supply.firebasestorage.app",
  messagingSenderId: "229423328981",
  appId: "1:229423328981:web:049b4589b1096ffc073c5c",
  measurementId: "G-ZMBMYM76QV",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };

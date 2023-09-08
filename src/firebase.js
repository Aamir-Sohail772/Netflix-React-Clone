import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWYGX9rfnIYc9iwC0ie646maI0RYWHa7U",
  authDomain: "netflix-clone-login-register.firebaseapp.com",
  projectId: "netflix-clone-login-register",
  storageBucket: "netflix-clone-login-register.appspot.com",
  messagingSenderId: "928822767572",
  appId: "1:928822767572:web:c485dc3c0ff1ae2c9b3041"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage();

export const provider = new GoogleAuthProvider();

export default app;
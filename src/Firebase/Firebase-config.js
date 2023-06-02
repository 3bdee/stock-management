import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCelyLBwaudSoheBqXus9-4K5YUnvGfbUw",
  authDomain: "stock-f96e8.firebaseapp.com",
  projectId: "stock-f96e8",
  storageBucket: "stock-f96e8.appspot.com",
  messagingSenderId: "871760721418",
  appId: "1:871760721418:web:73b46dd42d09a3a1e9d1f3",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

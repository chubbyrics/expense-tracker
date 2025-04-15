import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";  
import { 
  getAuth, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEfR24RQFBZ_mqqZkesUskoDeCuJJdOAI",
  authDomain: "expense-tracker-2dd95.firebaseapp.com",
  databaseURL: "https://expense-tracker-2dd95-default-rtdb.asia-southeast1.firebasedatabase.app/", 
  storageBucket: "expense-tracker-2dd95.appspot.com",
  messagingSenderId: "1052463581408",
  appId: "1:1052463581408:web:397017437b1d47570fa885",
  measurementId: "G-PW2XEGMGQE"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);  
const auth = getAuth(app);

// Auth functions
const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return signOut(auth);
};

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Export all necessary services
export { 
  auth, 
  db, 
  onAuthStateChanged,
  loginUser,
  logoutUser,
  registerUser
};
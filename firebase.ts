import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "*******",
  authDomain: "writespace-c8631.firebaseapp.com",
  projectId: "writespace-c8631",
  storageBucket: "writespace-c8631.firebasestorage.app",
  messagingSenderId: "541777558148",
  appId: "1:541777558148:web:91c971adb5b4b9e76360d1",
  measurementId: "G-Z93VHVPL82"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]; //check if app is created, give that or create a new one 
export const db = getFirestore(app);

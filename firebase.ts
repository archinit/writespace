import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
<<<<<<< HEAD
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
=======
  apiKey: "*******",
  authDomain: "writespace-c8631.firebaseapp.com",
  projectId: "writespace-c8631",
  storageBucket: "writespace-c8631.firebasestorage.app",
  messagingSenderId: "541777558148",
  appId: "1:541777558148:web:91c971adb5b4b9e76360d1",
  measurementId: "G-Z93VHVPL82"
>>>>>>> 6c09f40c2301ce9c2d37718112d48a3136ca126b
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]; //check if app is created, give that or create a new one 
export const db = getFirestore(app);

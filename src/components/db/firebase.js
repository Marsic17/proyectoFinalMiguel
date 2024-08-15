import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey:"AIzaSyAbh-wWETo0Jm2XIvPWOnqt4gK7gM5jHMs",                // process.env.REACT_APP_FIREBASE_API_KEY
  authDomain: "proyectofinal-ecommerce-83c29.firebaseapp.com",
  projectId: "proyectofinal-ecommerce-83c29",
  storageBucket: "proyectofinal-ecommerce-83c29.appspot.com",
  messagingSenderId: "808907092471",
  appId: "1:808907092471:web:d5402f40cc98bc23bc3ef2",
  measurementId: "G-DS8HVTX5FH"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;


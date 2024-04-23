
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyABFCrBaEKQip7PDbpUWyqmicIElQhOVMw",
  authDomain: "crud-72c45.firebaseapp.com",
  projectId: "crud-72c45",
  storageBucket: "crud-72c45.appspot.com",
  messagingSenderId: "851070244136",
  appId: "1:851070244136:web:acc575d08cc482e9086c1d",
  measurementId: "G-S33V2QKV7E"
};


const app = initializeApp(firebaseConfig);

 export const storage=getStorage(app)

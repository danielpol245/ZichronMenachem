
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjkoXIgxOC-v3g-1uhD0gxKpm3OmdNBCo",
  authDomain: "zichron-menachem.firebaseapp.com",
  projectId: "zichron-menachem",
  storageBucket: "zichron-menachem.appspot.com",
  messagingSenderId: "781813828342",
  appId: "1:781813828342:web:0665f87adac2c06d4dbad7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = getDatabase(app);
export const auth = firebase.auth();  
export {firebase , firestore};
export default firebase.getApp;

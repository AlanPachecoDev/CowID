// import firebase from 'firebase/compat/app';
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtM27TfqDg6J2nLROgUJqRcRfwa_c0zAs",
  authDomain: "cow-id-b4908.firebaseapp.com",
  projectId: "cow-id-b4908",
  storageBucket: "cow-id-b4908.appspot.com",
  messagingSenderId: "543420436842",
  appId: "1:543420436842:web:fd167bc6dffc6f93a89513"
};

// export function Store(){
//   const app = initializeApp(firebaseConfig);

//   return getFirestore(app);
// }

// export default  firebase.initializeApp(firebaseConfig);

import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection,addDoc} from "firebase/firestore";
//import { addUser } from "../pages/api/users";
import { getStorage } from "firebase/storage";
//import { useRouter } from "next/router";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY ,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);

export default app

export const db = getFirestore(app);
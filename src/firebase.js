import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.API_KEY ,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_IID,
  measurementId: process.env.MEASUREMENT_ID
};
// process.env.REACT_APP_FIREBASE_KEY
//dfdfdfdfddfdfdfdfdffdfdf
//alpalpfsdfhsudhfsdhfeqweqweqwe
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
export const analytics = getAnalytics(app);



import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB1mjajAfA3Bw8_Dnt_UvqNbfw40moJ-yQ",
  authDomain: "kinderjump-77a97.firebaseapp.com",
  projectId: "kinderjump-77a97",
  storageBucket: "kinderjump-77a97.firebasestorage.app",
  messagingSenderId: "219841203502",
  appId: "1:219841203502:web:526754b380bc0f73cd3ebf",
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const FIREBASE_APP = app;
export const FIREBASE_AUTH = getAuth(app);

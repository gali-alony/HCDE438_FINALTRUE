import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjIQSwaJsq2-0jHsEuwLBIOrRPrSa9784",
  authDomain: "lexilog-d4354.firebaseapp.com",
  projectId: "lexilog-d4354",
  storageBucket: "lexilog-d4354.appspot.com",
  messagingSenderId: "808159549945",
  appId: "1:808159549945:web:32ebe8e54e1482c1c38528"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export { db, auth, provider };

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
  apiKey: "AIzaSyAbHARgGEp_G5DOgCobrv0G0CAUtKy46d0",
  authDomain: "check-it-out-265bd.firebaseapp.com",
  projectId: "check-it-out-265bd",
  storageBucket: "check-it-out-265bd.appspot.com",
  messagingSenderId: "24869742191",
  appId: "1:24869742191:web:c65b0eb1965899181bcf9a",
  measurementId: "G-BD5TJ5XYS3",
  databaseURL: "" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };


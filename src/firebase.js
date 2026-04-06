import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXX85HoSjEuAKiQ0MYd3HnqAnA805P4Sg",
    authDomain: "startup-4bd98.firebaseapp.com",
    projectId: "startup-4bd98",
    storageBucket: "startup-4bd98.appspot.com",
    messagingSenderId: "404010801448",
    appId: "1:404010801448:web:151cbb557c9e7d2445981d",
    measurementId: "G-S8RF97PVG5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

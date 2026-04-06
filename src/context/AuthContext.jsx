import { createContext, useState, useContext, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register a new user with Firebase Auth + save extra info to Firestore
    const register = async ({ fullName, email, password, role }) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Set the display name on the Firebase Auth profile
        await updateProfile(firebaseUser, { displayName: fullName });

        // Save extra user data (role, name) to Firestore
        await setDoc(doc(db, "users", firebaseUser.uid), {
            uid: firebaseUser.uid,
            fullName,
            email,
            role,
            createdAt: new Date().toISOString(),
        });

        return firebaseUser;
    };

    // Sign in an existing user
    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    };

    // Sign out
    const logout = () => signOut(auth);

    // Listen to Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch extra profile info from Firestore
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    ...(userDoc.exists() ? userDoc.data() : {}),
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

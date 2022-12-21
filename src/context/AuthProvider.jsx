import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, db } from "../firebase/";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        isLogin: false,
    });
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const googleLogin = async () => {
        const provider = new firebaseAuth.GoogleAuthProvider();
        try {
            const user = await firebaseAuth.signInWithPopup(
                firebaseAuth.getAuth(),
                provider
            );
            if (firebaseAuth.getAdditionalUserInfo(user).isNewUser) {
                await db.setDoc(
                    db.doc(db.getFirestore(), "user", user.user.uid),
                    {
                        displayName: user.user.displayName,
                        email: user.user.email,
                        photoURL: user.user.photoURL,
                        uid: user.user.uid,
                    }
                );
            }
            navigate("/");
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const getUserInfo = async () => {
        try {
            const docRef = db.doc(
                db.getFirestore(),
                "user",
                firebaseAuth.getAuth().currentUser.uid
            );
            const docSnap = await db.getDoc(docRef);
            setUser(docSnap.data());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(
            firebaseAuth.getAuth(),
            (user) => {
                if (user) {
                    setAuth({
                        isLogin: true,
                    });
                    getUserInfo();
                    setLoading(false);
                } else {
                    setAuth({
                        isLogin: false,
                    });
                    setUser({});
                    setLoading(false);
                }
            }
        );
        return () => unsubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                setLoading,
                googleLogin,
                user,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

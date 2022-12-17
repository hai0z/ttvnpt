import React, { useEffect, useState, createContext } from "react";
import { firebaseAuth } from "../firebase/index";
export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        isLogin: false,
        userUid: "",
        email: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(
            firebaseAuth.getAuth(),
            (user) => {
                if (user) {
                    setAuth({
                        isLogin: true,
                        userUid: user.uid,
                        email: user.email,
                    });
                    setLoading(false);
                } else {
                    setAuth({
                        isLogin: false,
                        userUid: "",
                        email: "",
                    });
                    setLoading(false);
                }
            }
        );
        return () => unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

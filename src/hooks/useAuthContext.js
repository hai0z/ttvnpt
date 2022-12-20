import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
function useAuthContext() {
    const { auth, setAuth, loading, setLoading, googleLogin, user } =
        useContext(AuthContext);
    return { auth, setAuth, loading, setLoading, googleLogin, user };
}

export default useAuthContext;

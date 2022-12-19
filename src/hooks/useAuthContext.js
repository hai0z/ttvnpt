import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
function useAuthContext() {
    const { auth, setAuth, loading, setLoading, googleLogin } =
        useContext(AuthContext);
    return { auth, setAuth, loading, setLoading, googleLogin };
}

export default useAuthContext;

import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
function useAuthContext() {
    const { auth, setAuth, loading, setLoading } = useContext(AuthContext);
    return { auth, setAuth, loading, setLoading };
}

export default useAuthContext;

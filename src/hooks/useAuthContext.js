import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
function useAuthContext() {
    const { auth, googleLogin, user } = useContext(AuthContext);

    return { auth, googleLogin, user };
}

export default useAuthContext;

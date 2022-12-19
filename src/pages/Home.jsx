import React from "react";
import { firebaseAuth } from "../firebase";
import useAuthContext from "../hooks/useAuthContext";
import { toast } from "react-toastify";
function Home() {
    const { auth } = useAuthContext();
    const notify = () => toast("hêhe");

    return (
        <div className="min-h-screen bg-gray-800 text-3xl text-white">
            Home Page
            <h3>Wellcome {auth.email}</h3>
            <button onClick={notify}>abc</button>
            <br />
            <button
                className="px-10 py-5 rounded-md bg-indigo-500 text-white"
                onClick={() => {
                    firebaseAuth.signOut(firebaseAuth.getAuth());
                }}
            >
                logout
            </button>
        </div>
    );
}

export default Home;

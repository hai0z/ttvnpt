import React from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../firebase";
import useAuthContext from "../hooks/useAuthContext";

function Home() {
    const { auth } = useAuthContext();
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-800 text-3xl text-white">
            Home Page
            <h3>Wellcome {auth.email}</h3>
            <br />
            <button
                className="px-10 py-5 rounded-md bg-indigo-500 text-white"
                onClick={() => {
                    firebaseAuth.signOut(firebaseAuth.getAuth());
                    navigate("/login");
                }}
            >
                logout
            </button>
        </div>
    );
}

export default Home;

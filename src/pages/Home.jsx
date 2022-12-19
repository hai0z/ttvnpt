import React from "react";
import { firebaseAuth } from "../firebase";
import useAuthContext from "../hooks/useAuthContext";

function Home() {
    const { auth } = useAuthContext();

    return (
        <div className="min-h-screen bg-gray-800 text-3xl text-white">
            Home Page
            <h3>Wellcome {auth.email}</h3>
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

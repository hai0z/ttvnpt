import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

const App = () => {
    const { auth } = useAuthContext();
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={auth.isLogin ? <Home /> : <Login />}
                ></Route>
                <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
    const { auth } = useAuthContext();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={auth.isLogin ? <Home /> : <Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;

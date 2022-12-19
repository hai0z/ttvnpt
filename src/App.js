import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const RequireAuth = ({ user, children }) => {
    console.log(user);
    if (user?.islogin === false) {
        return <Navigate to="/login" replace />;
    } else return children;
};
const App = () => {
    const { auth } = useAuthContext();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAuth islogin={auth}>
                        <Home />
                    </RequireAuth>
                }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
};
export default App;

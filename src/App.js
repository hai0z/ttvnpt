import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const RequireAuth = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
const App = () => {
    const { auth } = useAuthContext();
    console.log({ auth });
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAuth user={auth.isLogin}>
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

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./components/Toast";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { store } from "./redux";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <AnimatePresence>
                        <App />
                    </AnimatePresence>
                    <Toast />
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

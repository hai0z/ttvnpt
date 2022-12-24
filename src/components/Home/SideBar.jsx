import React, { memo, useEffect, useRef, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";
function SideBar() {
    let location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [showMenu, setShowMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const menuRef = useRef();

    const [windowSize, setWindowSize] = useState({
        innerWidth: undefined,
        innerHeight: undefined,
    });

    const getCurrentTheme = () => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            if (JSON.parse(theme).mode === "dark") {
                setDarkMode(true);
            } else {
                setDarkMode(false);
            }
        } else {
            setDarkMode(false);
        }
    };

    useEffect(() => {
        getCurrentTheme();
    }, []);

    useEffect(() => {
        const body = document.body.classList;
        if (darkMode === true) {
            body.add("dark");
        } else {
            body.remove("dark");
        }
    }, [darkMode]);

    const changeTheme = () => {
        setDarkMode(!darkMode);
        darkMode === true
            ? localStorage.setItem("theme", JSON.stringify({ mode: "light" }))
            : localStorage.setItem("theme", JSON.stringify({ mode: "dark" }));
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                innerHeight: window.innerHeight,
                innerWidth: window.innerWidth,
            });
        };
        const handleClickOutSide = (e) => {
            if (menuRef && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", handleClickOutSide);
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            document.removeEventListener("click", handleClickOutSide);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowSize.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [windowSize]);
    return (
        <div
            className={
                isMobile && showMenu
                    ? "w-full min-h-screen absolute z-10 backdrop-brightness-50"
                    : !showMenu && !isMobile
                    ? "min-h-screen relative z-10 w-3/12"
                    : "min-h-screen absolute z-10"
            }
        >
            <div
                ref={menuRef}
                className={
                    isMobile && !showMenu
                        ? "min-h-screen bg-wihte lg:flex lg:flex-col bg-white x-50 transform p-1 drop-shadow-2xl transition-all duration-300 z-50 -translate-x-96 fixed dark:bg-gray-900"
                        : !showMenu
                        ? "min-h-screen bg-wihte lg:flex lg:flex-col md:w-full bg-white x-50 transform p-1 drop-shadow-2xl transition-all duration-300 relative z-50 dark:bg-gray-900"
                        : "min-h-screen bg-wihte lg:flex lg:flex-col md:w-full  bg-white x-50 transform p-1 drop-shadow-2xl transition-all duration-300 absolute z-50 dark:bg-gray-900"
                }
            >
                <svg
                    onClick={() => setShowMenu(!showMenu)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={
                        !isMobile
                            ? "hidden"
                            : showMenu
                            ? "w-8 h-8 absolute left-[100%] top-0 bg-stone-300 text-black shadow-lg transti duration-700 z-20"
                            : "w-8 h-8 absolute left-96 top-0 bg-stone-300 text-black shadow-lg transti duration-700 z-20"
                    }
                >
                    {showMenu ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    )}
                </svg>

                <div className="lg:flex lg:flex-row lg:p-5 flex flex-col justify-center items-center py-4">
                    <img
                        src={user?.photoURL}
                        alt="user-avatar"
                        className="rounded-full w-12 h-12"
                    />
                    <div className="lg:flex lg:flex-col lg:ml-3 lg:justify-center mt-1">
                        <span className="text-gray-600 lg:text-[14px] text-sm font-medium hidden lg:block dark:text-white">
                            Do - it
                        </span>
                        <span className="text-[#a18aff] text-[18px] font-medium dark:text-white">
                            {user?.displayName}
                        </span>
                    </div>
                </div>

                <div className="bg-[#a18aff] w-9/12  h-0.5  mt-4 mx-auto rounded-md" />
                <div
                    onClick={() => navigate("/")}
                    className="w-full  text-gray-600 mb-3 mt-16 flex items-center lg:ml-6 cursor-pointer ml-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={
                            location.pathname === "/"
                                ? "w-8 h-8 text-[#ca8bfe]"
                                : "w-8 h-8"
                        }
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                        />
                    </svg>
                    <span className="font-medium lg:ml-4 hover:text-purple-600 dark:text-white ml-1">
                        Today task
                    </span>
                </div>
                <div
                    onClick={() => navigate("/schedule")}
                    className="w-full hover:text-purple-600 text-gray-600 mb-3 mt-4 flex items-center lg:ml-6 ml-3 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={
                            location.pathname === "/schedule"
                                ? "w-8 h-8 text-[#ca8bfe]"
                                : "w-8 h-8"
                        }
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>

                    <span className="font-medium lg:ml-4 hover:text-purple-600 dark:text-white ml-1">
                        Scheduled Task
                    </span>
                </div>
                <div
                    className="w-full hover:text-purple-600 text-gray-600 mb-3 mt-4 flex items-center lg:ml-6 ml-3 cursor-pointer"
                    onClick={changeTheme}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        {!darkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                                />
                            </svg>
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            />
                        )}
                    </svg>

                    <span className="font-medium lg:ml-4 hover:text-purple-600 dark:text-white ml-1">
                        {!darkMode ? "Dark" : "Light"}
                    </span>
                </div>
                <button
                    className="text-blue-400 hover:text-blue-700"
                    onClick={async () => {
                        await firebaseAuth.signOut(firebaseAuth.getAuth());
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default memo(SideBar);

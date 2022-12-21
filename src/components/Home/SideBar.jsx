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
    const menuRef = useRef();

    const [windowSize, setWindowSize] = useState({
        innerWidth: undefined,
        innerHeight: undefined,
    });
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
        console.log(windowSize);
        if (windowSize.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [windowSize]);
    console.log(isMobile + " ismb");
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
                        ? "min-h-screen bg-wihte lg:flex lg:flex-col bg-white x-50 transform p-1 drop-shadow-2xl transition-all duration-300 z-50 -translate-x-96 fixed"
                        : !showMenu
                        ? "min-h-screen bg-wihte lg:flex lg:flex-col md:w-full  bg-white x-50 transform p-1 drop-shadow-2xl transition-all duration-300 relative z-50"
                        : "min-h-screen bg-wihte lg:flex lg:flex-col md:w-full  bg-white x-50 transform p-1 drop-shadow-2xl transition-all duration-300 absolute z-50"
                }
            >
                <svg
                    onClick={() => setShowMenu(!showMenu)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    )}
                </svg>

                <div className="md:flex md:flex-row md:p-5 flex flex-col justify-center items-center py-4">
                    <img
                        src={user?.photoURL}
                        alt="user-avatar"
                        className="rounded-full w-12 h-12"
                    />
                    <div className="md:flex md:flex-col md:ml-3 md:justify-center">
                        <span className="text-gray-600 text-[14px] font-medium hidden md:block">
                            Do - it
                        </span>
                        <span className="text-[#a18aff] text-[18px] font-medium">
                            {user?.displayName}
                        </span>
                    </div>
                </div>

                <div className="bg-[#a18aff] w-9/12  h-0.5  mt-4 mx-auto rounded-md" />
                <div
                    onClick={() => navigate("/")}
                    className="w-full  text-gray-600 mb-3 mt-16 flex items-center ml-6 cursor-pointer"
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
                    <span className="font-medium ml-4 hover:text-purple-600">
                        Today task
                    </span>
                </div>
                <div
                    onClick={() => navigate("/schedule")}
                    className="w-full hover:text-purple-600 text-gray-600 mb-3 mt-4 flex items-center ml-6 cursor-pointer"
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

                    <span className="font-medium ml-4 hover:text-purple-600">
                        Scheduled Task
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

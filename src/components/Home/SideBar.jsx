import React, { useMemo, memo } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";
function SideBar() {
    let location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const userInfo = useMemo(() => {
        return user;
    }, [user]);

    return (
        <div className="w-3/12 min-h-screen bg-stone-100  flex flex-col">
            <div className="flex flex-row p-5">
                <img
                    src={userInfo?.photoURL}
                    alt="user-avatar"
                    className="rounded-full w-12 h-12"
                />
                <div className="flex flex-col ml-3 justify-center">
                    <span className="text-gray-600 text-[14px] font-medium block">
                        Do - it
                    </span>
                    <span className="text-[#a18aff] text-[18px] font-medium">
                        {userInfo?.displayName}
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
    );
}

export default memo(SideBar);

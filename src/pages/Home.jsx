import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, db } from "../firebase";
import useAuthContext from "../hooks/useAuthContext";
import AddTaskModal from "../components/modal/AddTaskModal";
function Home() {
    const { user } = useAuthContext();
    const [modalVisible, setModalVisible] = useState(false);
    const userInfo = useMemo(() => {
        return user;
    }, [user]);

    const openModal = useCallback(() => {
        setModalVisible(true);
    }, []);

    const onClose = useCallback(() => {
        setModalVisible(false);
    }, []);

    const onSubmit = useCallback(() => {}, []);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#a18aff] flex flex-row p-3 relative">
            {user && (
                <>
                    <div className="w-3/12 min-h-screen bg-stone-100 rounded-tl-lg rounded-bl-lg flex flex-col">
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
                        <div className="bg-[#a18aff] w-9/12  h-0.5 justify-center items-center mt-4 m-auto" />
                        <button
                            onClick={async () => {
                                await firebaseAuth.signOut(
                                    firebaseAuth.getAuth()
                                );
                                navigate("/login");
                            }}
                        >
                            logout
                        </button>
                    </div>
                    <div
                        onClick={openModal}
                        className="w-9/12 min-h-screen bg-[#ba8cfe] bg-opacity-95 relative flex flex-col items-center rounded-br-md rounded-tr-md"
                    >
                        <span className="font-bold text-white text-5xl text-left mr-auto pl-24 pt-10">
                            Today Task
                        </span>

                        <div className="w-10/12 relative flex justify-center h-16 outline-none bg-stone-50 rounded-lg mt-6 pl-4 items-center cursor-pointer hover:bg-stone-100">
                            <span className="mr-auto ml-2 text-xl text-gray-400">
                                What is your next task?
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-[#4d189c] absolute z-1 right-4 top-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                />
                            </svg>
                            {/* <input
                                type="date"
                                className="w-32 absolute z-20 right-4 top-[50%] outline-none "
                            /> */}
                        </div>
                    </div>
                </>
            )}
            <AddTaskModal
                visible={modalVisible}
                onClose={onClose}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default Home;

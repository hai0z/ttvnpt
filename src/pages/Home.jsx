import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, db } from "../firebase";
import useAuthContext from "../hooks/useAuthContext";
import AddTaskModal from "../components/modal/AddTaskModal";
import TodoCard from "../components/todoList/TodoCard";
import { toast } from "react-toastify";

function Home() {
    const today = new Date().toISOString().slice(0, 10);

    const { user } = useAuthContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [todoList, setTodoList] = useState([]);

    const userInfo = useMemo(() => {
        return user;
    }, [user]);

    const openModal = useCallback(() => {
        setModalVisible(true);
    }, []);

    const onClose = useCallback(() => {
        setModalVisible(false);
    }, []);

    const onDelete = useCallback(
        (id) => {
            const deleteTodo = async () => {
                try {
                    await db.updateDoc(
                        db.doc(
                            db.getFirestore(),
                            "todos",
                            firebaseAuth.getAuth().currentUser.uid
                        ),
                        {
                            todo: [...todoList].filter(
                                (todo) => todo.id !== id
                            ),
                        }
                    );
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            };
            toast.promise(deleteTodo, {
                success: "Delete task success",
                pending: "Ading task ....",
                error: "Add error",
            });
        },
        [todoList]
    );

    const onSubmit = useCallback(
        async (todo) => {
            const addToto = async () => {
                try {
                    if (todoList.length <= 0) {
                        console.log(1);
                        await db.setDoc(
                            db.doc(
                                db.getFirestore(),
                                "todos",
                                firebaseAuth.getAuth().currentUser.uid
                            ),
                            {
                                todo: [
                                    ...(todoList ?? []),
                                    {
                                        title: todo.title,
                                        description: todo.description,
                                        date: todo.date,
                                        isComplete: todo.isComplete,
                                        id: Math.floor(Math.random() * 99999),
                                    },
                                ],
                            }
                        );
                        return;
                    }
                    await db.updateDoc(
                        db.doc(
                            db.getFirestore(),
                            "todos",
                            firebaseAuth.getAuth().currentUser.uid
                        ),
                        {
                            todo: [
                                ...(todoList ?? []),
                                {
                                    title: todo.title,
                                    description: todo.description,
                                    date: todo.date,
                                    isComplete: todo.isComplete,
                                    id: Math.floor(Math.random() * 99999),
                                },
                            ],
                        }
                    );
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            };
            toast.promise(addToto, {
                success: "Add task success",
                pending: "Ading task ....",
                error: "Add error",
            });
            setModalVisible(false);
        },
        [todoList]
    );
    const navigate = useNavigate();

    useEffect(() => {
        const docRef = db.doc(
            db.getFirestore(),
            "todos",
            firebaseAuth.getAuth().currentUser.uid
        );
        const unsub = db.onSnapshot(docRef, (doc) => {
            setTodoList(doc.data()?.todo);
        });
        return () => unsub();
    }, []);

    const searchTodo = (searchInput) => {
        const docRef = db.doc(
            db.getFirestore(),
            "todos",
            firebaseAuth.getAuth().currentUser.uid
        );
        if (searchInput === "") {
            db.onSnapshot(docRef, (doc) => {
                setTodoList(doc.data()?.todo);
            });
            return;
        }
        db.onSnapshot(docRef, (doc) => {
            setTodoList(
                doc
                    .data()
                    ?.todo.filter((todo) =>
                        todo.title.includes(searchInput.toLowerCase())
                    )
            );
        });
    };
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

                        <div className="bg-[#a18aff] w-9/12  h-0.5  mt-4 mx-auto rounded-md" />
                        <div className="w-full  text-gray-600 mb-3 mt-16 flex items-center ml-6 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-8 h-8 text-[#ca8bfe]"
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
                    <div className="w-9/12 min-h-screen bg-[#ba8cfe] bg-opacity-95 relative flex flex-col items-center rounded-br-md rounded-tr-md ">
                        <div className="absolute z-10 top-10 right-28">
                            <input
                                type="text"
                                placeholder="Enter task title..."
                                className="h-8 w-64 rounded-md outline-none ring-0 focus:ring-2 pl-3 ring-pink-400 hover:ring-2"
                                onChange={(e) => searchTodo(e.target.value)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 absolute top-1 right-0 cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </div>
                        <span className="font-bold text-white text-5xl text-left mr-auto pl-24 pt-10">
                            Today Task
                        </span>

                        <div
                            onClick={openModal}
                            className="w-10/12 relative flex justify-center h-16 outline-none bg-stone-50 rounded-lg mt-6 pl-4 items-center cursor-pointer hover:bg-stone-100"
                        >
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
                        </div>
                        <div className="h-auto w-full mt-6 flex flex-row justify-center items-center flex-wrap">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {todoList?.map((todo, index) => (
                                    <TodoCard
                                        key={index}
                                        todo={todo}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </div>
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

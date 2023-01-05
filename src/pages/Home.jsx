import React, { useCallback, useEffect, useState } from "react";
import { firebaseAuth, db } from "../firebase";
import AddTaskModal from "../components/modal/AddTaskModal";
import TodoCard from "../components/todoList/TodoCard";
import { toast } from "react-toastify";
import SideBar from "../components/Home/SideBar";
import { motion } from "framer-motion";
function Home() {
    const today = new Date().toISOString().slice(0, 10);

    const [modalVisible, setModalVisible] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [showSearchInput, setShowSearchInput] = useState(false);

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
                pending: "Deleting task ....",
                error: "Delete error",
            });
        },

        [todoList]
    );
    const onSubmit = useCallback(
        (todo) => {
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
                                        date: todo.date ?? today,
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
                                    date: todo.date ?? today,
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
        [todoList, today]
    );
    useEffect(() => {
        const docRef = db.doc(
            db.getFirestore(),
            "todos",
            firebaseAuth.getAuth().currentUser.uid
        );
        const unsub = db.onSnapshot(docRef, (doc) => {
            setTodoList(doc.data()?.todo ?? []);
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
        <div className="min-h-screen flex flex-row relative font-mono">
            <SideBar />
            <motion.div
                className="w-full min-h-screen bg-[#a18aff] bg-opacity-95 relative flex flex-col items-center overflow-x-hidden dark:bg-slate-600"
                initial={{ translateX: 600 }}
                animate={{ translateX: 0 }}
                exit={{ translateX: 600 }}
                transition={{ duration: 0.75 }}
            >
                <motion.span
                    className="font-bold text-white text-5xl md:text-left md:mr-auto md:pl-24 pt-10 text-center"
                    initial={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 0.75 }}
                >
                    Today Task
                </motion.span>
                <motion.div className="relative h-8 w-64 flex justify-center items-center mt-2 ml-auto mr-10 xl:mr-28 lg:mr-24 md:mr-20 sm:mr-16">
                    <motion.input
                        type="text"
                        placeholder={
                            showSearchInput ? "Enter task title..." : ""
                        }
                        className={
                            showSearchInput
                                ? "w-64 rounded-md outline-none -right-0 focus:ring-2 pl-3 ring-pink-400 hover:ring-2 absolute transition-all duration-1000"
                                : "w-6 absolute transition-all duration-1000 pl-3 -right-0 rounded-full bg-inherit text-[#a18aff]"
                        }
                        onChange={(e) => {
                            searchTodo(e.target.value);
                        }}
                    />
                    <motion.svg
                        onClick={() => {
                            setShowSearchInput(!showSearchInput);
                        }}
                        initial={{ opacity: 0, right: 8 }}
                        animate={{ opacity: 1, right: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        exit={{ opacity: 0, right: 8 }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer absolute hover:bg-slate-200 rounded-full"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </motion.svg>
                </motion.div>
                <div
                    onClick={openModal}
                    className="w-10/12 relative flex justify-center h-16 outline-none bg-stone-50 rounded-lg mt-6 pl-4 items-center cursor-pointer hover:bg-stone-100"
                >
                    <motion.span
                        className="mr-auto ml-2 md:text-xl text-sm text-gray-400"
                        initial={{ marginLeft: 200 }}
                        animate={{ marginLeft: 8 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        What is your next task?
                    </motion.span>
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
                    {todoList?.filter((todo) => todo.date === today).length <=
                        0 && (
                        <p className="text-2xl font-medium mx-auto mt-12 text-white">
                            Không có dữ liệu
                        </p>
                    )}
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {todoList
                            ?.filter((todo) => todo.date === today)
                            .map((todo, index) => (
                                <TodoCard
                                    key={index}
                                    todo={todo}
                                    onDelete={onDelete}
                                    index={index}
                                />
                            ))}
                    </motion.div>
                </div>
            </motion.div>

            <AddTaskModal
                visible={modalVisible}
                onClose={onClose}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default Home;

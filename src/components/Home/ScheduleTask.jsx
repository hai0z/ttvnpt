import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { firebaseAuth, db } from "../../firebase";
import TodoCard from "../todoList/TodoCard";
import { motion } from "framer-motion";
function ScheduleTask() {
    const [todoList, setTodoList] = useState([]);
    useEffect(() => {
        console.log(1);
        const docRef = db.doc(
            db.getFirestore(),
            "todos",
            firebaseAuth.getAuth().currentUser.uid
        );
        const unsub = db.onSnapshot(docRef, (doc) => {
            const date = [
                ...new Set([...doc.data()?.todo.map((todo) => todo.date)]),
            ];
            console.log(date);
            const todo = date.map((d) => {
                const data = doc.data()?.todo.filter((x) => x.date === d);
                return { day: data };
            });
            setTodoList(todo);
        });

        return () => unsub();
    }, []);
    return (
        <div className="min-h-screen  flex flex-row  relative font-mono">
            <SideBar />
            <motion.div
                className="w-9/12 h-screen bg-[#ba8cfe] bg-opacity-95 relative flex flex-col items-center rounded-br-md rounded-tr-md overflow-scroll overflow-x-hidden overflow-y-auto overscroll-x-contain"
                initial={{
                    scaleY: 0,
                }}
                animate={{
                    scaleY: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="h-64 w-full mt-6 flex flex-col ">
                    {todoList?.length <= 0 && (
                        <p className="text-2xl font-medium mx-auto mt-12 text-white">
                            Không có dữ liệu
                        </p>
                    )}
                    <div className="flex flex-col items-center justify-center">
                        {todoList
                            .sort((a, b) => a - b)
                            ?.map((todo, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="pl-20 flex justify-center flex-col mb-10"
                                    >
                                        <motion.p className="text-3xl text-white font-bold font-mono">
                                            {todo?.day[0].date}
                                        </motion.p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {todo?.day.map((d, index) => {
                                                return (
                                                    <TodoCard
                                                        key={index}
                                                        todo={d}
                                                        index={index}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ScheduleTask;

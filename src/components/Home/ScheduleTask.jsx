import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { firebaseAuth, db } from "../../firebase";
import TodoCard from "../todoList/TodoCard";
function ScheduleTask() {
    const [todoList, setTodoList] = useState([]);
    const [day, setDay] = useState([]);

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
            const todo = date.map((d) => {
                const data = doc.data()?.todo.filter((x) => x.date === d);
                return { day: data };
            });
            setTodoList(todo);
        });

        return () => unsub();
    }, []);
    return (
        <div className="min-h-screen bg-[#a18aff] flex flex-row p-3 relative font-mono">
            <SideBar />
            <div className="w-9/12 min-h-screen bg-[#ba8cfe] bg-opacity-95 relative flex flex-col items-center rounded-br-md rounded-tr-md ">
                <div className="h-auto w-full mt-6 flex flex-col">
                    {todoList?.length <= 0 && (
                        <p className="text-2xl font-medium mx-auto mt-12 text-white">
                            Không có dữ liệu
                        </p>
                    )}
                    <div className="flex flex-col items-center justify-center">
                        {todoList?.map((todo) => {
                            return (
                                <div className="pl-20 flex justify-center flex-col mb-10">
                                    <p className="text-3xl text-white font-bold font-mono">
                                        {todo?.day[0].date}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {todo?.day.map((d) => {
                                            return (
                                                <TodoCard key={d.id} todo={d} />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleTask;

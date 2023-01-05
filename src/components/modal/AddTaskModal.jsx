import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { useFormik } from "formik";
function AddTaskModal({ onSubmit, onClose, visible }) {
    const formik = useFormik({
        initialValues: {
            id: "",
            title: "",
            description: "",
            date: "",
            isComplete: false,
        },
        onSubmit: (values) => {
            onSubmit(values);
        },
        validationSchema: Yup.object({
            title: Yup.string().required(),
            description: Yup.string().required(),
            date: Yup.date().required(),
        }),
    });
    return (
        <dh-component>
            <form onSubmit={formik.handleSubmit}>
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    className={
                        visible
                            ? `py-16 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 backdrop-blur-sm`
                            : "hidden"
                    }
                    id="modal"
                >
                    <div
                        role="alert"
                        className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
                    >
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 dark:bg-gray-600 dark:border-none">
                            <div className="w-full flex justify-start text-gray-600 mb-3 dark:text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-16 h-16"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4 dark:text-white">
                                Enter Task
                            </h1>
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal dark:text-white">
                                Task Titile
                            </label>
                            <input
                                id="title"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                onChange={formik.handleChange}
                                name="title"
                            />
                            {formik.errors.title && (
                                <p className="text-sm text-red-500">
                                    {formik.errors.title}
                                </p>
                            )}
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal dark:text-white">
                                Task Descriptions
                            </label>
                            <div className="relative mb-5 mt-2">
                                <input
                                    id="email2"
                                    className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    onChange={formik.handleChange}
                                    name="description"
                                />
                                {formik.errors.description && (
                                    <p className="text-sm text-red-500">
                                        {formik.errors.description}
                                    </p>
                                )}
                            </div>
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal dark:text-white">
                                Date
                            </label>
                            <div className="relative mb-5 mt-2">
                                <input
                                    type="date"
                                    className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border p-1"
                                    onChange={formik.handleChange}
                                    name="date"
                                />
                                {formik.errors.date && (
                                    <p className="text-sm text-red-500">
                                        {formik.errors.date}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-start w-full">
                                <input
                                    type="submit"
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                                    value="Submit"
                                />

                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                                    Cancel
                                </button>
                            </div>
                            <button
                                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600 dark:text-white dark:hover:text-gray-400"
                                onClick={onClose}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-x"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </form>
        </dh-component>
    );
}

export default AddTaskModal;

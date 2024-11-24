import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./graph.css";
import Labbels from "./Labbels";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenseLimit, updateExpenseLimit } from "../redux/expenseSlice";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Graph() {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newLimit, setNewLimit] = useState("");

    useEffect(() => {
        dispatch(fetchExpenseLimit());
    }, [dispatch]);

    const expenses = useSelector((state) => state.expenses || []);
    const total = useSelector((state) => state.totalAmount);
    const monthlyExpLimit = useSelector((state) => state.expense.monthlyLimit);

    const handleEditClick = () => {
        setIsEditing(true);
        setNewLimit(monthlyExpLimit);
    };

    const handleSaveClick = () => {
        dispatch(updateExpenseLimit(newLimit));
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewLimit("");
    };

    const config = {
        data: {
            labels: ["Magenta", "Blue", "Orange", "Green", "Red", "Yellow"],
            datasets: [
                {
                    label: "My First Dataset",
                    data: [300, 50, 100, 50, 80, 70],
                    backgroundColor: [
                        "rgb(255, 0, 255)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 165, 0)",
                        "rgb(0, 255, 0)",
                        "rgb(255, 0, 0)",
                        "rgb(255, 255, 0)",
                    ],
                    hoverOffset: 4,
                    borderRadius: 10,
                    spacing: 1,
                },
            ],
        },
    };

    return (
        <div className="flex justify-content max-w-xs mx-auto">
            <div className="item">
                <div className="chart relative">
                    <Doughnut {...config} />
                    <h3 className="mb-4 font-bold title">
                        Total:
                        <span className="block text-3xl text-emrald-400">
                        {total !== undefined ? total : "0"}$
                        </span>
                    </h3>
                    <h2 className="mb-4 font-bold title flex items-center gap-2">
                        Expense Limit:
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="border rounded px-2 py-1 w-20 text-center"
                                    value={newLimit}
                                    onChange={(e) => setNewLimit(e.target.value)}
                                />
                                <button
                                    className="bg-green-500 text-white rounded-full px-2 py-1 hover:bg-green-600"
                                    onClick={handleSaveClick}
                                    title="Save"
                                >
                                    ✔
                                </button>
                                <button
                                    className="bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
                                    onClick={handleCancelClick}
                                    title="Cancel"
                                >
                                    ✖
                                </button>
                            </div>
                        ) : (
                            <>
                                <box-icon
                                    onClick={handleEditClick}
                                    name="edit-alt"
                                    className="cursor-pointer hover:text-blue-600"
                                    title="Edit"
                                ></box-icon>
                                <span className="block text-3xl text-emrald-400">
                                {monthlyExpLimit !== undefined ? monthlyExpLimit : "0"}$
                                </span>
                            </>
                        )}
                    </h2>
                </div>

                <div className="flex flex-col py-10 gap-4">
                    {/* Labels */}
                    <Labbels />
                </div>
            </div>
        </div>
    );
}

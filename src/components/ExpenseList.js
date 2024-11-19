import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, fetchExpenses } from "../redux/expenseSlice";
import ExpenseForm from "./ExpenseForm";
import Graph from "./Graph";
import Form from "./Form";

const ExpenseList = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses || []);
    const monthlyLimit = useSelector((state) => state.monthlyLimit);

    // Fetch expenses for the selected month when it changes
    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    return (
        <div className="expenseList">
            <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
                <h1 className="text-4xl text-white rounded bg-slate-800 mb-10 py-8">
                    Expense Tracker
                </h1>
                {/* grid columns */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Chart */}
                    <Graph />
                    {/* Form */}
                    <Form />
                </div>
            </div>
        </div>
    );
};

export default ExpenseList;

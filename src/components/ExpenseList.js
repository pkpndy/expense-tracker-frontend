import React, {useEffect } from "react";
import { useDispatch} from "react-redux";
import { deleteExpense, fetchAnalytics, fetchExpenseLimit, fetchExpenses } from "../redux/expenseSlice";
import Graph from "./Graph";
import Form from "./Form";

const ExpenseList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExpenses());
        dispatch(fetchExpenseLimit());
        dispatch(fetchAnalytics());
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

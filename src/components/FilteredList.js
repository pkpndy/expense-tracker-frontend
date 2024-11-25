import React from "react";
import FilterDialog from "./FilterDialog";
import { useSearchParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { CategoryColors } from "../enums/categoryEnum";

export default function FilteredList() {
    const expenses = useSelector((state) => state.expense.expenses || []);
    console.log(expenses);

    return (
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 font-bold text-xl">List</h1>
            <FilterDialog />
            {expenses.map((v, i) => (
                <Expense key={i} data={v} />
            ))}
        </div>
    );
}

function Expense({ data }) {
    if (!data) return null;
    return (
        <div
            className="item flex justify-center bg-gray-50 py-2 rounded-r"
            style={{
                borderRight: `8px solid ${CategoryColors[data.category] ?? "rgb(128,128,128)"}`,
            }}>
            <span className="block w-full font-bold">{data.description}</span>
            <span className="ml-3">{data.amount} $</span>
        </div>
    );
}

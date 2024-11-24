import React from "react";
import FilterDialog from "./FilterDialog";
import { useSearchParams} from "react-router-dom";
import { useSelector } from "react-redux";

export default function FilteredList() {
    const expenses = useSelector((state) => state.expense.expenses || []);
    console.log(expenses);
  
    const obj = [
        {
            name: "biscuit",
            category: "rgb(255, 0, 255)",
            price: 20,
        },
        {
            name: "lotion",
            // category: "rgb(54, 162, 235)",
            price: 80,
        },
    ];

    const [searchParams, setSearchParams] = useSearchParams();

    const handleApplyFilter = (filters) => {
        const params = {};
        if (filters.category) params.category = filters.category;
        if (filters.startDate) params.startDate = filters.startDate;
        if (filters.endDate) params.endDate = filters.endDate;
        if (filters.minAmount) params.minAmount = filters.minAmount;
        if (filters.maxAmount) params.maxAmount = filters.maxAmount;

        setSearchParams(params);
    };

    const handleResetFilters = () => {
        setSearchParams({});
    };

    return (
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 font-bold text-xl">List</h1>
            <FilterDialog
                onApplyFilter={handleApplyFilter}
                onResetFilters={handleResetFilters}
            />
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
                borderRight: `8px solid ${data.categor ?? "rgb(128,128,128)"}`,
            }}>
            <span className="ml-3">Rs.{data.amount}</span>
            <span className="block w-full">{data.description}</span>
        </div>
    );
}

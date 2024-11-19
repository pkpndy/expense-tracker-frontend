import React from "react";

export default function FilteredList() {
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

    return (
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 font-bold text-xl">List</h1>
            {obj.map((v, i) => (
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
                borderRight: `8px solid ${data.category ?? "rgb(128,128,128)"}`,
            }}>
            <span className="ml-3">Rs.{data.price}</span>
            <span className="block w-full">{data.name}</span>
        </div>
    );
}

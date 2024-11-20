import React, { useState } from "react";
import "boxicons";

const FilterDialog = ({ onApplyFilter, onResetFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: "",
        startDate: "",
        endDate: "",
        minAmount: "",
        maxAmount: "",
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFilters({
            category: "",
            startDate: "",
            endDate: "",
            minAmount: "",
            maxAmount: "",
        });
        onResetFilters();
    };

    const handleApply = () => {
        onApplyFilter(filters);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-800 flex items-center justify-center gap-2">
                <span className="font-bold">Open Filters</span>
                <box-icon name="filter-alt" color="white"></box-icon>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white w-96 p-6 rounded shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>

                        <form className="flex flex-col gap-4">
                            <label>
                                <span>Category</span>
                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleChange}
                                    className="border p-2 w-full">
                                    <option value="">All Categories</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Entertainment">
                                        Entertainment
                                    </option>
                                </select>
                            </label>

                            <label>
                                <span>Date Range</span>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={filters.startDate}
                                        onChange={handleChange}
                                        className="border p-2 flex-1"
                                    />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={filters.endDate}
                                        onChange={handleChange}
                                        className="border p-2 flex-1"
                                    />
                                </div>
                            </label>

                            <label>
                                <span>Amount Range</span>
                                <div className="flex flex-wrap gap-2">
                                    <input
                                        type="number"
                                        name="minAmount"
                                        placeholder="Min Amount"
                                        value={filters.minAmount}
                                        onChange={handleChange}
                                        className="border p-2 flex-1 min-w-0"
                                    />
                                    <input
                                        type="number"
                                        name="maxAmount"
                                        placeholder="Max Amount"
                                        value={filters.maxAmount}
                                        onChange={handleChange}
                                        className="border p-2 flex-1 min-w-0"
                                    />
                                </div>
                            </label>
                        </form>

                        <div className="flex justify-between items-center pt-4 border-t mt-4">
                            <button
                                onClick={handleReset}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                                Reset All
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FilterDialog;

import React from "react";
import { useForm } from "react-hook-form";
import { CategoryArray } from "../enums/categoryEnum";
import "./form.css";
import FilteredList from "./FilteredList";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/expenseSlice";

export default function Form() {
    //register for registering the inputs
    //handleSubmit will handleSubmit function
    //resetField will reset the fields
    const { register, handleSubmit, resetField } = useForm();

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(addExpense(data));
    };

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h2 className="font-bold pb-4 text-xl">Tranasction</h2>

            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input
                            type="text"
                            {...register("name")}
                            className="form-input"
                            placeholder="Name or Expense description"
                        />
                    </div>
                    <select className="form-input" {...register("category")}>
                        <option value="" disabled selected>
                            Select Category
                        </option>
                        {CategoryArray.map((category, index) => (
                            <option key={index} value={category} >
                                {category}
                            </option>
                        ))}
                    </select>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Amount"
                            {...register("amount")}
                            className="form-input"
                        />
                    </div>
                    <div className="submit-btn">
                        <button className="border py-2 text-white bg-indigo-500 w-full">
                            Add Expense
                        </button>
                    </div>
                </div>
            </form>

            <FilteredList />
        </div>
    );
}

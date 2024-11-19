import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/expenseSlice";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({ category: "", amount: "", date: "", description: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" />
      <input name="date" type="date" value={formData.date} onChange={handleChange} placeholder="Date" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;

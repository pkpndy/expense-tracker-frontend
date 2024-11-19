import React from 'react';
import { useForm } from "react-hook-form";
import './form.css';
import FilteredList from './FilteredList';

export default function Form() {
    //register for registering the inputs
    //handleSubmit will handleSubmit function
    //resetField will reset the fields
    const { register, handleSubmit, resetField } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    

  return (
      <div className="form max-w-sm mx-auto w-96">
          <h2 className="font-bold pb-4 text-xl">Tranasction</h2>

          <form id="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                  <div className="input-group">
                      <input type='text' {...register('name')} className='form-input' placeholder='Name or Expense description' />
                  </div>
                  <select className='form-input' {...register('category')}>
                      <option value="Groceries" defaultValue>Category</option>
                      <option value="Anything">Cat</option>
                  </select>
                  <div className="input-group">
                      <input type="text" placeholder='Amount' {...register('amount')} className='form-input' />
                  </div>
                  <div className="submit-btn">
                      <button className='border py-2 text-white bg-indigo-500 w-full'>Add Expense</button>
                  </div>
              </div>
          </form>

          <FilteredList />
    </div>
  )
}

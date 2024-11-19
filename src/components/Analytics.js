
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const monthlyLimit = useSelector((state) => state.expense.monthlyLimit);

  // Process data for category-wise pie chart
  const categoryData = expenses.reduce((acc, expense) => {
    const category = acc.find(cat => cat.name === expense.category);
    if (category) category.value += expense.amount;
    else acc.push({ name: expense.category, value: expense.amount });
    return acc;
  }, []);

  // Monthly trend data
  const monthlyData = expenses.map(exp => ({ date: exp.date, amount: exp.amount }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Category-wise Expense</h2>
        <PieChart width={400} height={400}>
          <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Monthly Expense Trend</h2>
        <LineChart width={500} height={300} data={monthlyData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke={monthlyData.reduce((acc, val) => acc + val.amount, 0) > monthlyLimit ? "red" : "green"} />
        </LineChart>
      </div>
    </div>
  );
};

export default Analytics;

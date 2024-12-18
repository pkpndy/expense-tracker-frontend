import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import { checkAuth } from './redux/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import ExpenseList from './components/ExpenseList';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              {/* <ExpenseTracker /> */}
            </ProtectedRoute>
          }
        />
          <Route path="/list" element={<ExpenseList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

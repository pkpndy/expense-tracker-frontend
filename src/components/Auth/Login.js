import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, checkAuth } from "../../redux/authSlice";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            dispatch(checkAuth()); 
            navigate("/list"); 
        }
    }, [dispatch, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser({ email, password })).unwrap();
            console.log(result);
            if (result.message === "Login successful") {
                navigate("/list");
            }
        } catch (err) {
            setError(err.message || "Login failed"); // Set server error message
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </form>

                <div className="flex justify-center my-6">
                    <hr className="w-4/5 border-gray-300" />
                </div>

                <p className="text-center">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(
                signupUser({ email, password })
            ).unwrap();

            if (result.message === "User created successfully") {
                setSuccessMessage("Signup successful! Please log in.");

                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/");
                }, 3000);
            }
        } catch (err) {
            setError(err.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {successMessage && (
                <div className="absolute top-4 w-4/5 md:w-1/2 bg-green-500 text-white p-3 rounded shadow-lg text-center">
                    {successMessage}
                </div>
            )}
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
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
                        Sign Up
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </form>

                <div className="flex justify-center my-6">
                    <hr className="w-4/5 border-gray-300" />
                </div>

                <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

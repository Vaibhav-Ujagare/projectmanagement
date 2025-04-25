import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../service/apiClient.js";
import UserContext from "../context/UserContext.js";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await apiClient.signup(username, email, password);
            console.log(data);
            if (data.success) {
                setUser(data);
                navigate("/profile");
            } else {
                setError(data.message || "Signup Failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-center text-indigo-400 mb-6">
                    Create an Account
                </h2>

                {error && (
                    <div className="text-red-400 mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Choose a password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${
                            loading
                                ? "bg-indigo-400"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        } text-white py-2 rounded-md transition duration-200`}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <span
                        className="text-indigo-400 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;

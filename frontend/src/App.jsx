import { useState } from "react";
import "./App.css";
import "./index.css";
import Login from "./components/Login";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
    const [name, setName] = useState(0);
    const navigate = useNavigate();
    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white font-sans">
                {/* Fixed Navbar */}
                <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow z-50">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-indigo-400">
                            MyApp
                        </h1>
                        <div className="space-x-2">
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-24 pb-12 px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-3 text-indigo-300">
                            Welcome to MyApp
                        </h2>
                        <p className="text-gray-300 text-base">
                            Build your dream projects, manage your team, and
                            grow — all in one place.
                        </p>
                        <div className="mt-6">
                            <button className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2.5 rounded-md text-white text-sm">
                                Get Started
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-center py-4">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} MyApp. All rights
                        reserved.
                    </p>
                </footer>
            </div>
        </>
    );
}

export default App;

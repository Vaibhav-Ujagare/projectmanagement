// src/pages/Profile.jsx
import React, { useContext } from "react";
import UserContext from "../context/UserContext.js";

function Profile() {
    const { user } = useContext(UserContext);
    console.log("user:", user);
    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-6 text-black">
            <h1 className="text-2xl font-bold mb-4">
                Welcome, {user.data.username}
            </h1>
            <p>Email: {user.data.email}</p>
            {/* Add more user info as needed */}
        </div>
    );
}

export default Profile;

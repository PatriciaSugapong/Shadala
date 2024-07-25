import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Axios from "axios"; // Import Axios

function DriverStatusContext() {
  const [status, setStatus] = useState("Available"); // Default status is Available
  const [userID, setUserID] = useState(""); // State to store user ID

  const handleToggleChange = async () => {
    const newStatus = status === "Available" ? "Unavailable" : "Available";
    setStatus(newStatus);
    try {
      // Send request to toggle status
      const response = await Axios.post("http://localhost:3001/drivers/toggleStatus", { userID, status: newStatus });
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error toggling driver status:", error);
    }
  };

  // Function to retrieve the logged-in user from session storage
  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  };

  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
      setUserID(user.UserID); // Set the user ID state
    }
  }, []);

  // Get the logged-in user
  const loggedInUser = getLoggedInUser();

  // Function to get the appropriate styles for the status text
  const getStatusTextStyles = () => {
    switch (status) {
      case "Newly Registered":
        return "tbg-teal-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-teal-400";
      case "Available":
        return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-teal-400";
      case "Occupied":
        return "bg-teal-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-teal-400";
      case "Unavailable":
        return "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-red-400";
      default:
        return ""; // Default to an empty string
    }
  };

  return (
    <div className="flex items-center justify-center mb-3 mt-2 rounded-xl bg-teal-500 relative px-2 py-3 font-Montserrat shadow-lg">
      <FaUserCircle size={75} className="text-white mr-4" />
      <div className="flex flex-col">
        <span className="text-lg font-bold text-white">
          Hey, {loggedInUser ? loggedInUser.EmailAddress.split("@")[0] : ""}
        </span>
        <span className="text-white text-sm mb-1">Pasay City</span>
        <div className="flex items-center">
          <span
            className={`mr-2 px-2.5 py-0.5 rounded border border-teal-400 ${getStatusTextStyles()}`}
          >
            {status}
          </span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={status === "Available"}
              onChange={handleToggleChange}
              disabled={status === "Occupied"}
            />
            <div className="relative w-9 h-5 bg-red-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-600 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default DriverStatusContext;

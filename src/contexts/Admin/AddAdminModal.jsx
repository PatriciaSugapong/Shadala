import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash, FaUserPlus } from "react-icons/fa6";
import Axios from "axios";

function AddAdminModal({ onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const handleConfirmPasswordClick = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const addAdmin = async (e) => {
    e.preventDefault();

    let formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await Axios.post(
        "http://localhost:3001/signup/admin",
        formData
      );

      console.log(response.data);

      resetForm();
      onClose();
    } catch (error) {}
  };

  return (
    <div
      id="static-modal"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50 transition-opacity duration-300"
    >
      <div className="relative p-4 w-full max-w-md font-Montserrat">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 transform transition-all duration-1000 opacity-100 scale-100 ease-in-out">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Admin
            </h3>

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <FaTimes />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form onSubmit={addAdmin} className="px-4 pb-4 md:px-5">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="grid-cols-2">
                <label
                  className="block text-sm font-medium text-gray-800 text-left"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-800 text-left"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-800 text-left"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none mb-2"
              />
            </div>
            <div className="col-2">
              <label
                className="block text-sm font-medium text-gray-800 text-left"
                htmlFor="password"
              >
                Password
              </label>

              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordEye ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none"
                />
                <div class="mt-1 text-[12px] text-gray-500 dark:text-gray-300 text-left mb-4">
                  Must be at least 8 characters and contain at least one symbol,
                  one number, one uppercase letter, and one lowercase letter.
                </div>

                <div className="text-xl absolute top-3 right-4">
                  {!passwordEye ? (
                    <FaRegEyeSlash onClick={handlePasswordClick} />
                  ) : (
                    <FaRegEye onClick={handlePasswordClick} />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <FaUserPlus className="mr-2" size={15} />
              Add New Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAdminModal;

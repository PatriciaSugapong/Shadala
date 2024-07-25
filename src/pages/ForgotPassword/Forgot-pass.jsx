import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import Footer from "../../components/ui/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post("http://localhost:3001/forgot-pass", {
        email,
      });
      console.log(response.data);
      navigate("/forgot-pass/verification-code");
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
    }

    console.log("Button clicked successfully!"); // Log a message when the button is clicked
  };
  return (
    <div>
      <div className="bg-gradient-to-b from-white via-white to-teal-200 h-[89vh] mx-auto text-center flex flex-col justify-center ">
        <div className="font-Montserrat w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <Link to="/ph-en">
                <img className="w-auto h-14" src={icon} alt="" />
              </Link>
            </div>

            <h3 className="my-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
              Forgot Password
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="text-left">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg mb-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <a href="/forgot-pass/verification-code">
                <button
                  type="submit"
                  className="w-full mt-3 block items-center text-white bg-[#10969f] hover:bg-[#20848b] transition-colors font-medium rounded-[20px] px-5 py-3"
                >
                  Request Password Recovery
                </button>
              </a>
            </form>
          </div>

          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Already remember your password?{" "}
            </span>

            <Link
              to="/signin"
              className="mx-2 text-sm font-bold text-teal-500 dark:text-blue-400 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;

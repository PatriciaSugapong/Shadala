import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import axios from "axios";
import Footer from "../../components/ui/Footer";

const PassVerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/forgot-pass/verifycode",
        { verificationCode }
      );
      console.log(response.data);
      navigate("/forgot-pass/new-password");
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-b from-white via-white to-teal-200 h-[89vh] mx-auto text-center flex flex-col justify-center">
        <div className="font-Montserrat w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <Link to="/ph-en">
                <img className="w-auto h-14" src={icon} alt="" />
              </Link>
            </div>

            <h3 className="my-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
              Verification Code
            </h3>
            <p>We have sent a code to your email</p>

            <div className="text-left">
              <label
                htmlFor="verificationCode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter Code
              </label>
              <input
                type="text"
                id="verificationCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg mb-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleVerification}
              className="w-full mt-3 block items-center text-white bg-[#10969f] hover:bg-[#20848b] transition-colors font-medium rounded-[20px] px-5 py-3"
            >
              Verify and Proceed
            </button>
          </div>

          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Already remember your password?{" "}
            </span>

            <a
              href="#"
              className="mx-2 text-sm font-bold text-teal-500 dark:text-blue-400 hover:underline"
            >
              <Link to="/signin">Sign In</Link>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PassVerifyCode;

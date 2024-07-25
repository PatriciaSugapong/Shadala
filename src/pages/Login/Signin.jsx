import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import Axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Toast } from "../../components/ui/Toast";
import Footer from "../../components/ui/Footer.jsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await Axios.post(
        "http://localhost:3001/signin",
        userData
      );
      const responseData = response.data;

      // Check if responseData contains user data
      if (responseData && responseData.user) {
        const loggedInUser = responseData.user;
        console.log("loggedInUser:", loggedInUser);
        setUser(loggedInUser);
        sessionStorage.setItem("user", JSON.stringify(loggedInUser)); // Store user data as a string in localStorage
        setToastMessage("Login successful");

        // Debug: Show account type of the user
        console.log("Account type:", loggedInUser.AccountTypeID);

        // Determine the redirect URL based on the account type
        let redirectUrl;
        switch (loggedInUser.AccountTypeID) {
          case 1:
            redirectUrl = "/admin";
            break;
          case 2:
            redirectUrl = "/book";
            break;
          case 3:
            redirectUrl = "/driver";
            break;
          default:
            redirectUrl = "/ph-en";
        }
        navigate(redirectUrl); // Redirect the user to the appropriate page

        // Reset form fields
        resetForm();
      } else {
        setToastMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setToastMessage("Error signing in. Please try again."); // Set appropriate error message
    }
  };

  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  return (
    <div>
      <Toast message={toastMessage} />
      <div className="bg-gradient-to-b from-white via-white to-teal-200 h-[89vh] mx-auto text-center flex flex-col justify-center ">
        <div className="font-Montserrat w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <Link to="/ph-en">
                <img className="w-auto h-14" src={icon} alt="" />
              </Link>
            </div>
            <h3 className="mt-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
              Welcome Back!
            </h3>

            <p className="mb-3 text-[12px] text-center text-gray-500 dark:text-gray-400">
              Your Padala, Our Priority
            </p>
            <form onSubmit={signIn}>
              <div className="text-left">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className={`sm:text-sm rounded-lg mb-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-gray-90 ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "bg-gray-50 border border-gray-300"
                  }`}
                  placeholder="name@company.com"
                />
              </div>
              <div className="text-left">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                    className="mt-p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                  />
                  <div className="text-xl absolute top-3 right-4">
                    {!passwordEye ? (
                      <FaRegEyeSlash onClick={handlePasswordClick} />
                    ) : (
                      <FaRegEye onClick={handlePasswordClick} />
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/forgot-pass"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full mt-3 block items-center text-white bg-[#10969f] hover:bg-[#20848b] transition-colors font-medium rounded-[20px] px-5 py-3"
              >
                Sign in
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Don't have an account?{" "}
            </span>
            <a
              href="#"
              className="mx-2 text-sm font-bold text-teal-500 dark:text-blue-400 hover:underline"
            >
              <Link to="/signup">Sign Up</Link>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;

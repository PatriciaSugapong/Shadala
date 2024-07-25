import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";
import { FaUser } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import Footer from "../../components/ui/Footer.jsx";

export default function UserTypeSelection() {
  return (
    <div>
      <div className="bg-gradient-to-b from-white via-white to-teal-200 mx-auto text-center flex flex-col justify-center p-5 min-h-[90vh]">
        <div className="font-Montserrat w-full max-w-[900px] mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-5">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <Link to="/ph-en">
                <img className="w-auto h-14" src={icon} alt="" />
              </Link>
            </div>

            <h3 className="mt-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
              Create an Account
            </h3>

            <p className="mb-3 text-[12px] text-center text-gray-500 dark:text-gray-400">
              Your Padala, Our Priority
            </p>

            <div className="flex flex-col items-center justify-center">
              <div className="flex">
                <Link
                  to="/signup/customer"
                  className={`text-teal-500 p-8 flex flex-col items-center justify-center mr-4 outline outline-teal-500 rounded-xl bg-[#feffff] transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white focus:outline-none focus:scale-105 focus:bg-teal-500 focus:text-white `}
                >
                  <FaUser size={80} />
                  <span className="mt-2 font-extrabold">Customer</span>
                  <span>Explore hassle-free bookings for your needs.</span>
                </Link>

                <Link
                  to="/signup/driver"
                  className={`text-teal-500 p-8 flex flex-col items-center justify-center mr-4 outline outline-teal-500 rounded-xl bg-[#feffff] transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white focus:outline-none focus:scale-105 focus:bg-teal-500 focus:text-white `}
                >
                  <GiSteeringWheel size={80} />
                  <span className="mt-2 font-extrabold">Driver</span>
                  <span>Join us as a delivery rider and hit the road!</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Already have an account?{" "}
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
}

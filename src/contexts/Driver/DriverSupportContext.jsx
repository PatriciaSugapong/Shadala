import React from "react";
import { FiPhoneCall, FiMail } from "react-icons/fi"; // Import phone and mail icons
import image from "../../assets/customerSupport.jpeg";
import DriverStatusContext from "./DriverStatusContext";

function DriverSupportContext() {
  return (
    <div className="mx-5 font-Montserrat">
      <DriverStatusContext />
      <div className="items-center justify-center">
        <div className="relative bg-gradient-to-b from-teal-500 to-gray-900 text-white py-12 px-6 rounded-lg overflow-hidden shadow-lg">
          <img
            src={image}
            alt="Customer Support"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative text-center pt-[225px]">
            <h1 className="text-lg font-bold mb-1 text-teal-100 text-stroke outline-teal-500">
              Customer Support
            </h1>
            <hr />
            <p className="mt-1 text-sm text-white-700">
              Have questions or need assistance? Our customer support team is
              here to help you!
            </p>
            <div className="flex items-center justify-center mr-4 mt-2">
              <FiPhoneCall size={20} className="text-white-500 mr-2" />
              <p className="text-white-700 text-sm ">
                Call us: <b>+63 962 827 2873</b>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <FiMail size={20} className="text-white -500 mr-2" />
              <p className="text-white-700 text-sm">
                Email us: <b>support@shadala.com</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverSupportContext;

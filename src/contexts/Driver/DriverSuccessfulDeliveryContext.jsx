import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing the check circle icon from react-icons/fa
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function DriverSuccessfulDeliveryContext() {
  const navigate = useNavigate();
  const BackToHome = () => {
    navigate("/driver/history");
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-teal-500 ">
      <div className="bg-white rounded-lg p-8 text-center flex flex-col justify-center items-center">
        <div className="mb-4">
          {/* Big check circle icon */}
          <FaCheckCircle className="text-6xl text-teal-500" />
        </div>
        <p className="text-lg font-bold text-teal-500">SUCCESSFUL DELIVERY!</p>
        {/* Text */}
        <p className="text-[10px]">
          Thank you for your service! <br></br>Your successful delivery has been
          recorded.
        </p>
        <button
          onClick={BackToHome}
          className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 flex flex-row items-center"
        >
          <IoArrowBackCircleSharp size={20} />
          <p className="ml-2 font-semibold">Back to Home</p>
        </button>
      </div>
    </div>
  );
}

export default DriverSuccessfulDeliveryContext;

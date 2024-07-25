import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const LoadingSpinner = ({ color }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50 ">
      <div className="transform rotate-45 transition-transform duration-300 ease-in-out">
        <ClimbingBoxLoader color={color} size={25} />
      </div>
    </div>
  );
};

export default LoadingSpinner;

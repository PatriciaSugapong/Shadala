import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
function BookingLimitModal({ closeLimitModal }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-md w-full relative">
        {/* <button
          className="absolute top-2 right-2 z-10 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={closeLimitModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}
        <div className="flex items-center justify-center text-red-500 mt-5">
          <FiAlertCircle className="text-6xl" />
        </div>
        <h3 className="mt-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
          Booking Limit Reached
        </h3>
        <p className="text-center text-md mt-2">
          You have reached the maximum limit of pending bookings. You cannot
          book more until some of your pending bookings are completed or
          canceled.
        </p>
        <div className="justify-center my-4 block w-full px-5">
          <Link to="/history">
            <button
              className="bg-[#10969f] hover:bg-[#20848b] text-white font-medium rounded-lg px-5 py-3 w-full"
              onClick={closeLimitModal}
            >
              See Bookings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingLimitModal;

import React from "react";
import { FiAlertCircle } from "react-icons/fi";

function CancelBookingModal({
  bookingId,
  closeCancelModal,
  handleCancelBooking,
}) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg max-w-md w-full relative p-5 font-Montserrat m-5">
          <button
            className="absolute top-3 right-3 z-10 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={closeCancelModal}
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
          </button>
          <div className="flex items-center justify-center text-red-500">
            <FiAlertCircle className="text-6xl" />
          </div>
          <h3 className="mt-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
            Are you sure you want to cancel?
          </h3>
          <p className="text-center text-md my-2 px-5">
            Cancelling this booking will result in the loss of any unsaved
            changes.
          </p>
          <div className="flex justify-center mt-5">
            <button
              className="mr-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              onClick={() => handleCancelBooking(bookingId)}
            >
              Cancel Booking
            </button>
            <button
              className="bg-white-500 outline outline-1 outline-gray-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-teal-800"
              onClick={closeCancelModal}
            >
              Keep Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelBookingModal;

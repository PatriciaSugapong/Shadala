import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { TbLocationQuestion } from "react-icons/tb";
import Axios from "axios";
import { getLoggedInUser } from "../../utils/userUtils";

function DriverAcceptModalContext({ isOpen, onClose, booking }) {
  const handleAccept = async () => {
    try {
      const loggedInUser = getLoggedInUser();
      console.log("loggedInUser:", loggedInUser); // Debug log
      if (loggedInUser) {
        const userID = loggedInUser.UserID;
        console.log("userID:", userID); // Debug log
        await Axios.put(
          `http://localhost:3001/bookings/updateBookingStatus/${booking.BookingID}`,
          { userID: userID, bookingStatus: "For Pickup" }
        );

        onClose();
      } else {
        console.log("User not logged in or session data missing.");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md max-h-full opacity-100">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <MdOutlineClose />
              </button>
              <div className="p-4 md:p-5">
                <div className="flex flex-row">
                  <TbLocationQuestion size={25} />
                  <h3 className="ml-2 text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-2">
                    Confirmation
                  </h3>
                </div>
                <hr />
                <h3 className="my-3 text-md font-normal text-gray-800 dark:text-gray-400">
                  Are you sure you want to accept this booking?
                </h3>
                <p className="text-[10px] text-gray-600 mb-3">
                  By accepting this booking, you commit to fulfilling the
                  associated responsibilities. Please ensure your availability
                  and readiness to proceed before confirming.
                </p>
                <button
                  type="button"
                  className="px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  No, cancel
                </button>
                <button
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 ms-2 text-center"
                  onClick={handleAccept}
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DriverAcceptModalContext;

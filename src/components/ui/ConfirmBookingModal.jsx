import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const ConfirmBookingModal = ({ bookingDetails, onConfirm, onClose }) => {
  const formattedTotalPrice = "₱ " + bookingDetails.totalPrice.toFixed(2);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
          <h3 className="text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
            <div className="flex flex-row justify-between items-center">
              <FaQuestionCircle className="mr-2" size={25} />
              Confirm Booking?
            </div>
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <form>
          <div className="px-5 py-4">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Parcel Origin
                </label>
                <input
                  value={bookingDetails.parcelOrigin}
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Parcel Destination
                </label>
                <input
                  value={bookingDetails.parcelDestination}
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sender Details
                </label>
                <div
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                >
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Sender Name: </p>{" "}
                    {bookingDetails.senderName}
                  </p>
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Phone Number: </p>{" "}
                    {bookingDetails.senderContactNum}
                  </p>
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Block / Floor / Room: </p>
                    {bookingDetails.senderBlockNum}
                  </p>
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Receiver Details
                </label>
                <div
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                >
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Sender Name: </p>{" "}
                    {bookingDetails.receiverName}
                  </p>
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Phone Number: </p>{" "}
                    {bookingDetails.receiverContactNum}
                  </p>
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Block / Floor / Room: </p>
                    {bookingDetails.receiverBlockNum}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vehicle Type
                </label>
                <input
                  value={bookingDetails.vehicleType}
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Price
                </label>
                <input
                  value={formattedTotalPrice}
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                />
                <p className="text-sm font-semibold mt-2 text-gray-800">
                  Cash on Delivery
                </p>
              </div>
            </div>
          </div>
          <div className="justify-between p-2 border-t rounded-t dark:border-gray-600 mb-2">
            <p className="text-center text-sm my-2 px-5">
              By confirming, you will proceed with the booking and will no
              longer be able to cancel. Any unsaved changes may be lost.
            </p>
            <div className="flex justify-center mt-2">
              <button
                className="mr-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={onConfirm}
              >
                Yes, confirm
              </button>
              <button
                className="bg-white-500 outline outline-1 outline-gray-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-teal-800"
                onClick={onClose}
              >
                No, cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmBookingModal;

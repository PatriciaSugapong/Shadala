import React from "react";
import icon from "../../assets/icon.png";
import { AiOutlineClose } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";

function ViewBookingModal({ booking, closeViewModal }) {
  // const formattedTotalPrice = "₱ " + booking.TotalPrice.toFixed(2);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center z-100">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex flex-row items-center">
            <FaInfoCircle className="mr-2" size={20} />
            View Booking Information
          </h3>
          <button
            onClick={closeViewModal}
            className="text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose className="w-6 h-6" />
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
                  Tracking Number
                </label>
                <input
                  value={booking.TrackingNumber}
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
                  Booking Status
                </label>
                <input
                  value={booking.BookingStatus}
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
                  Parcel Origin
                </label>
                <input
                  value={booking.ParcelOrigin}
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
                  value={booking.ParcelDestination}
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
                    {booking.SenderName}
                  </p>
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Phone Number: </p>{" "}
                    {booking.SenderContactNum}
                  </p>
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Block / Floor / Room: </p>
                    {booking.SenderBlockNum}
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
                    {booking.ReceiverName}
                  </p>
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Phone Number: </p>{" "}
                    {booking.ReceiverContactNum}
                  </p>
                  <p className="text-gray-700 flex flex-row">
                    <p className="mr-1 font-medium">Block / Floor / Room: </p>
                    {booking.ReceiverBlockNum}
                  </p>
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vehicle Type
                </label>
                <input
                  value={booking.VehicleType}
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
                  Assigned Driver
                </label>
                <input
                  value={booking.AssignedDriver}
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
                  Vehicle Model
                </label>
                <input
                  value={booking.VehicleModel}
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
                  Plate Number
                </label>
                <input
                  value={booking.PlateNumber}
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
                  value={booking.TotalPrice}
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
              <div className="col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Proof of Delivery
                </label>
                {booking.BookingStatus === "Completed" && (
                  <img
                    src={`http://localhost:3001/uploads/${booking.ProofOfDelivery}`}
                    alt="Proof of Delivery"
                    className="max-w-[250px] h-auto object-cover rounded-lg cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewBookingModal;

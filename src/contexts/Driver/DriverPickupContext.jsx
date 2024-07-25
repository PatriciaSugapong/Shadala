import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  FaDolly,
  FaRegCircleDot,
  FaCircleInfo,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";
import { RiMapPinFill, RiCashFill } from "react-icons/ri";
import DriverAcceptModalContext from "./DriverAcceptModalContext";
import DriverParcelTransitContext from "./DriverParcelTransitContext";
import DriverStatus from "./DriverStatusContext";

function DriverPickupContext() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [transitContextVisible, setTransitContextVisible] = useState(false);
  const [availableContextVisible, setAvailableContextVisible] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/bookings/pending"
        );
        const declinedBookings =
          JSON.parse(localStorage.getItem("declinedBookings")) || [];
        setBookings(
          response.data.filter(
            (booking) => !declinedBookings.includes(booking.BookingID)
          )
        );
      } catch (error) {
        console.error("Error fetching pending bookings:", error);
      }
    };

    fetchPendingBookings();
  }, []);

  const handleAccept = (booking) => {
    console.log("Accepted Booking:", booking);
    setSelectedBooking(booking);
    setIsOpen(true);
  };

  const handleDecline = (bookingId) => {
    console.log("Declining Booking:", bookingId);
    // Remove the booking from the list in the frontend state
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.BookingID !== bookingId)
    );
    // Store the declined booking ID in local storage
    const declinedBookings =
      JSON.parse(localStorage.getItem("declinedBookings")) || [];
    localStorage.setItem(
      "declinedBookings",
      JSON.stringify([...declinedBookings, bookingId])
    );
  };

  const handleParcelTransitVisible = () => {
    setTransitContextVisible(true);
    setAvailableContextVisible(false);
  };

  const toggleDetails = (bookingId) => {
    setShowDetails((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
  };

  return (
    <div className="mx-5 font-Montserrat">
      <DriverStatus />

      <DriverAcceptModalContext
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAccept={handleAccept}
        booking={selectedBooking}
        onTransitVisible={handleParcelTransitVisible}
      />

      {!transitContextVisible && selectedBooking && (
        <DriverParcelTransitContext booking={selectedBooking} />
      )}

      {!transitContextVisible && !selectedBooking && (
        <div className="hide-when-transit">
          <h1 className="text-left text-sm mb-2 font-semibold text-gray-800">
            Available Deliveries
          </h1>
          <div className="h-full overflow-y-auto mb-[100px]">
            {bookings.map((booking) => (
              <div
                key={booking.BookingID}
                className="mx-auto bg-white rounded-lg shadow-md overflow-auto mb-2"
              >
                <div className="bg-teal-500 text-white px-4 py-1 rounded-t-lg flex flex-row items-center">
                  <FaDolly className="mr-2" />
                  <h2 className="text-lg font-semibold">For Pickup</h2>
                </div>
                <div className="p-2 text-sm relative">
                  <button
                    className="bg-teal-500 text-white p-1 rounded-full hover:bg-teal-600 text-sm absolute top-0 right-0 mt-1 mr-2"
                    onClick={() => toggleDetails(booking.BookingID)}
                  >
                    <FaCircleInfo />
                  </button>
                  <div className="mb-1">
                    <p className="font-bold text-gray-800">
                      {booking.FirstName} {booking.LastName}
                    </p>
                  </div>
                  <div className="ml-4 mb-1 flex flex-row items-center">
                    <FaRegCircleDot />
                    <p className="ml-2 text-gray-800">{booking.ParcelOrigin}</p>
                  </div>
                  {showDetails[booking.BookingID] && (
                    <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2 ">
                      <p className="text-[12px] text-gray-700">
                        <b>Sender Name:</b> {booking.SenderName} <br />
                        <b>Phone Number:</b> {booking.SenderContactNum} <br />
                        <b>Block/Floor/Room:</b> {booking.SenderBlockNum}
                      </p>
                    </div>
                  )}
                  <div className="ml-4 mb-1 flex flex-row items-center">
                    <RiMapPinFill />
                    <p className="ml-2 text-gray-800">
                      {booking.ParcelDestination}
                    </p>
                  </div>
                  {showDetails[booking.BookingID] && (
                    <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2 ">
                      <p className="text-[12px] text-gray-700">
                        <b>Receiver Name:</b> {booking.ReceiverName} <br />
                        <b>Phone Number:</b> {booking.ReceiverContactNum} <br />
                        <b>Block/Floor/Room:</b> {booking.ReceiverBlockNum}
                      </p>
                    </div>
                  )}
                  <div className="font-bold mb-1 text-teal-800 flex flex-row items-center">
                    <RiCashFill size={20} className="mr-1" />
                    <p>PHP {booking.TotalPrice}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-xs text-teal-800 mr-2">
                        Cash on Delivery
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 items-center flex flex-row mr-2"
                        onClick={() => {
                          console.log(
                            "Declining booking with ID:",
                            booking.BookingID
                          );
                          handleDecline(booking.BookingID);
                        }}
                      >
                        <FaCircleXmark className="mr-1" />
                        Decline
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 items-center flex flex-row"
                        onClick={() => {
                          handleAccept(booking); // Pass the booking object instead of booking ID
                        }}
                      >
                        <FaCircleCheck className="mr-1" />
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverPickupContext;

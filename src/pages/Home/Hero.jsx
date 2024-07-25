import React, { useState } from "react";
import { FaCalendarPlus, FaBox } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import TrackParcelModal from "./TrackParcelModal"; // Import your Modal component here
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotLoggedInBookNow from "../../components/ui/NotLoggedInBookNow";

const Hero = () => {
  // Function to retrieve the logged-in user from session storage
  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };

  // Get the logged-in user
  const loggedInUser = getLoggedInUser();

  const navigate = useNavigate();

  const [showNotLoggedInBookNowModal, setShowNotLoggedInBookNowModal] =
    useState(false);

  const handleBookNow = () => {
    if (loggedInUser) {
      // If user is logged in, redirect to book component
      navigate("/book");
    } else {
      // If user is not logged in, show modal
      setShowNotLoggedInBookNowModal(true);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [parcelInfo, setParcelInfo] = useState(null);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(false); // State to track input error

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTrackParcel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/bookings/getParcelInfo?trackingNumber=${trackingNumber}`
      );
      setParcelInfo(response.data);
      console.log("Parcel Info:", response.data); // Log parcelInfo here
      toggleModal(); // Show modal after successfully fetching parcel info
    } catch (error) {
      console.error("Error fetching parcel info:", error);
      setError(error.message); // Set error message to the actual error received
    }
  };

  const isInputEmpty = trackingNumber.trim() === "";

  return (
    <div className="font-Montserrat bg-gradient-to-b from-white via-white to-teal-200 pb-2">
      <div className="max-w-[800px] my-[-96px] w-full h-[60vh] mx-auto text-center flex flex-col justify-center">
        <h1 className="md:text-7xl sm:text-6xl text-4xl md:py-6 font-extrabold p-2 text-[#131313]">
          Sinong magdadala?
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold text-[#10969fa9]">
            Siya! Dala!
          </p>
          <ReactTyped
            className="md:text-5xl sm:text-4xl text-xl font-extrabold pl-2 text-[#10969f]"
            strings={["SHADALA!"]}
            typeSpeed={180}
            backSpeed={100}
            loop
          />
        </div>
        {showNotLoggedInBookNowModal && (
          <NotLoggedInBookNow
            onClose={() => setShowNotLoggedInBookNowModal(false)}
          />
        )}
        <div className="flex space-x-4 mt-6 justify-center p-3">
          <button
            type="button"
            className="flex items-center text-white bg-[#10969f] hover:bg-[#20848b] font-medium rounded-[20px] px-5 py-3"
            onClick={handleBookNow}
          >
            <span className="flex items-center font-bold">
              <FaCalendarPlus className="mr-1" /> Book Now
            </span>
          </button>
          <div className="flex items-center w-[60%]">
            <input
              className={`w-full h-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-l-[20px] pr-3 pl-5 ${
                inputError ? "border-red-500" : ""
              }`}
              id=""
              type="text"
              placeholder="Tracking Number"
              onChange={(e) => {
                setTrackingNumber(e.target.value);
                setInputError(false); // Reset input error state when input changes
              }}
            />
            <button
              type="button"
              className={`w-[60%] text-white bg-[#FFC65B] hover:bg-[#dfa232] font-medium rounded-r-[20px] px-5 py-3 ${
                isInputEmpty ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleTrackParcel}
              disabled={isInputEmpty}
            >
              <span className="flex items-center font-bold">
                <FaBox className="mr-1" />
                Track Parcel
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Render modal component if showModal state is true */}
      {showModal && (
        <TrackParcelModal
          onClose={toggleModal}
          parcelInfo={parcelInfo}
          error={error}
        />
      )}
    </div>
  );
};

export default Hero;

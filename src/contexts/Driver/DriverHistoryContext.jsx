import React, { useState, useEffect } from "react";
import DriverStatus from "./DriverStatusContext";
import {
  FaDolly,
  FaRegCircleDot,
  FaCircleInfo,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";
import { RiMapPinFill, RiCashFill } from "react-icons/ri";
import { BsHouseCheckFill } from "react-icons/bs";
import { getLoggedInUser } from "../../utils/userUtils"; // Import the function
import Axios from "axios";
import ImageModal from "../../components/ui/ImageModal";
import EmptyTable from "../../components/ui/EmptyTable";

function DriverHistoryContext() {
  const [driverHistory, setDriverHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  const loggedInUser = getLoggedInUser(); // Get the logged-in user
  let userID = null; // Define userID variable here

  if (loggedInUser) {
    userID = loggedInUser.UserID; // Assign userID if user is logged in
    console.log("Retrieved userID:", userID);
  } else {
    console.log("User not logged in or session data missing.");
  }

  useEffect(() => {
    console.log("Fetching driver history for userID:", userID);

    const fetchDriverHistory = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3001/drivers/driverHistory?userID=${userID}`
        );
        console.log("Response from backend:", response.data);
        setDriverHistory(response.data);
      } catch (error) {
        console.error("Error fetching driver history:", error);
      }
    };

    if (userID) {
      fetchDriverHistory();
    }
  }, [userID]);

  const toggleDetails = (bookingId) => {
    setShowDetails((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mx-5 font-Montserrat">
      <DriverStatus />
      <div className="hide-when-transit">
        <h1 className="text-left text-sm mb-2 font-semibold text-gray-800">
          History
        </h1>
        <div className="h-full overflow-y-auto mb-[100px]">
          {driverHistory.length > 0 ? (
            driverHistory.map((dHistory) => (
              <div
                key={dHistory.BookingID}
                className="mx-auto bg-white rounded-lg shadow-md overflow-auto mb-2"
              >
                <div className="bg-teal-500 text-white px-4 py-1 rounded-t-lg flex flex-row items-center">
                  <FaDolly className="mr-2" />
                  <h2 className="text-lg font-semibold">
                    {dHistory.BookingStatus}
                  </h2>
                </div>
                <div className="p-2 text-sm relative">
                  <button
                    className="bg-teal-500 text-white p-1 rounded-full hover:bg-teal-600 text-sm absolute top-0 right-0 mt-1 mr-2"
                    onClick={() => toggleDetails(dHistory.BookingID)}
                  >
                    <FaCircleInfo />
                  </button>
                  <div className="mb-1">
                    <p className="font-bold text-gray-800">
                      {dHistory.CustomerName}
                    </p>
                  </div>
                  <div className="ml-4 mb-1 flex flex-row items-center">
                    <FaRegCircleDot />
                    <p className="ml-2 text-gray-800">
                      {dHistory.ParcelOrigin}
                    </p>
                  </div>
                  {showDetails[dHistory.BookingID] && (
                    <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2 ">
                      <p className="text-[12px] text-gray-700">
                        <b>Sender Name:</b> {dHistory.SenderName} <br />
                        <b>Phone Number:</b> {dHistory.SenderContactNum} <br />
                        <b>Block/Floor/Room:</b> {dHistory.SenderBlockNum}
                      </p>
                    </div>
                  )}
                  <div className="ml-4 mb-1 flex flex-row items-center">
                    <RiMapPinFill />
                    <p className="ml-2 text-gray-800">
                      {dHistory.ParcelDestination}
                    </p>
                  </div>
                  {showDetails[dHistory.BookingID] && (
                    <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2 ">
                      <p className="text-[12px] text-gray-700">
                        <b>Receiver Name:</b> {dHistory.ReceiverName} <br />
                        <b>Phone Number:</b> {dHistory.ReceiverContactNum}{" "}
                        <br />
                        <b>Block/Floor/Room:</b>{" "}
                        {driverHistory.ReceiverBlockNum}
                      </p>
                    </div>
                  )}
                  {showDetails[dHistory.BookingID] && (
                    <>
                      <div className="ml-4 mb-1">
                        <p className="font-bold text-gray-800">
                          Proof of Delivery
                        </p>
                      </div>
                      <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2">
                        <img
                          src={`http://localhost:3001/uploads/${dHistory.ProofOfDelivery}`}
                          alt="Proof of Delivery"
                          className="w-auto h-40 object-cover rounded-lg cursor-pointer"
                          onClick={() =>
                            openModal(
                              `http://localhost:3001/uploads/${dHistory.ProofOfDelivery}`
                            )
                          }
                        />
                      </div>
                    </>
                  )}
                  {isModalOpen && (
                    <ImageModal
                      imageSrc={selectedImage}
                      closeModal={closeModal}
                    />
                  )}

                  <div className="font-bold mb-1 text-teal-800 flex flex-row items-center">
                    <RiCashFill size={20} className="mr-1" />
                    <p>PHP {dHistory.TotalPrice}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-xs text-teal-800 mr-2">
                        Cash on Delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <EmptyTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverHistoryContext;

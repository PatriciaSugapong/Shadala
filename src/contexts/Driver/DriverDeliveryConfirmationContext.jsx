import React, { useState, useRef } from "react";
import { FaRegCircleDot, FaCircleInfo } from "react-icons/fa6";
import { RiMapPinFill, RiCashFill } from "react-icons/ri";
import { TbHomeQuestion } from "react-icons/tb";
import { FaCamera } from "react-icons/fa";
import { BsFillBox2HeartFill } from "react-icons/bs";
import DriverConfirmDeliveryModal from "./DriverConfirmDeliveryModalContext"; // Import the DriverAcceptModal component
import Axios from "axios";
import { getLoggedInUser } from "../../utils/userUtils";

function DriverDeliveryConfirmationContext({ booking }) {
  const [proofOfDelivery, setProofOfDelivery] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const videoRef = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click
  const [hideButton, setHideButton] = useState(false); // State to control button visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleAccept = async (e) => {
    e.preventDefault();

    const loggedInUser = getLoggedInUser();
    let userID = null;

    if (loggedInUser) {
      userID = loggedInUser.UserID;
      console.log("Retrieved userID:", userID);
    } else {
      console.log("User not logged in or session data missing.");
      return;
    }

    console.log("Submitting form...");

    try {
      const updateBookingResponse = await Axios.put(
        `http://localhost:3001/bookings/updateBookingStatus/${booking.BookingID}`,
        { userID: userID, bookingStatus: "Completed" }
      );

      console.log("Booking status updated successfully.");
      console.log("Update booking response:", updateBookingResponse.data);

      handleSnapshot();

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error handling booking acceptance:", error);
    }
  };

  const handleSnapshot = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const imgUrl = canvas.toDataURL("image/jpeg");
    setPhotoPreview(imgUrl);

    const timestamp = new Date().toLocaleString().replace(/[/: ]/g, "");
    const randomString = Math.random().toString(36).substring(2, 12);
    const fileName = `${timestamp}_${randomString}_ProofOfDelivery.jpg`;

    canvas.toBlob((blob) => {
      const file = new File([blob], fileName, { type: "image/jpeg" });
      setProofOfDelivery(file);

      const bookingID = booking.BookingID;
      uploadProofOfDelivery(bookingID, file);
      console.log(file);
    });

    videoRef.current.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    setHideButton(true);
  };

  const uploadProofOfDelivery = async (bookingID, file) => {
    try {
      console.log("Booking ID:", bookingID);
      console.log("File:", file);

      const formData = new FormData();
      formData.append("bookingID", bookingID);
      formData.append("proofOfDelivery", file);

      console.log("FormData:", formData);

      const response = await Axios.put(
        `http://localhost:3001/bookings/uploadProofOfDelivery/${bookingID}`,
        formData
      );

      console.log("Proof of delivery submitted successfully.");
      console.log("Proof delivery response:", response.data);
    } catch (error) {
      console.error("Error uploading proof of delivery:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
      setButtonClicked(true); // Update buttonClicked state to true
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <div>
      <div className="mx-auto bg-white rounded-lg shadow-md overflow-auto">
        {/* Modal */}
        <DriverConfirmDeliveryModal isOpen={isModalOpen} onClose={closeModal} />
        <div className="bg-teal-500 text-white px-4 py-1 rounded-t-lg flex flex-row items-center mt-2">
          <TbHomeQuestion size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">Confirm This Delivery</h2>
        </div>
        <div className="p-2 text-sm relative">
          <button className="bg-teal-500 text-white p-1 rounded-full hover:bg-teal-600 text-sm absolute top-0 right-0 mt-1 mr-2">
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
          <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2 ">
            <p className="text-[12px] text-gray-700">
              <b>Sender Name:</b> {booking.SenderName} <br />
              <b>Phone Number:</b> {booking.SenderContactNum} <br />
              <b>Block/Floor/Room:</b> {booking.SenderBlockNum}
            </p>
          </div>
          <div className="ml-4 mb-1 flex flex-row items-center">
            <RiMapPinFill />
            <p className="ml-2 text-gray-800 font-semibold">
              {booking.ParcelDestination}
            </p>
          </div>
          <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2 ">
            <p className="text-[12px] text-gray-700">
              <b>Receiver Name:</b> {booking.ReceiverName} <br />
              <b>Phone Number:</b> {booking.ReceiverContactNum} <br />
              <b>Block/Floor/Room:</b> {booking.ReceiverBlockNum}
            </p>
          </div>
          <div className="flex items-center">
            <div className="font-bold mb-1 text-teal-800 flex flex-col items-start">
              <div className="flex flex-row items-center">
                <RiCashFill size={20} className="mr-1" />
                <p>PHP {booking.TotalPrice}.00</p>
              </div>
              <p className="text-xs text-teal-800">Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-auto mb-[100px]">
        <div className="p-2 text-sm relative">
          <div className="flex flex-row">
            <p className="text-xs mb-2">
              Take a photo of the recipient's acknowledgement of the parcel as
              evidence of delivery.
            </p>
            <div className="mt-2">
              {!photoPreview &&
                !hideButton && ( // Only show button if it's not clicked and not hidden
                  <button
                    onClick={handleCapture}
                    disabled={buttonClicked} // Disable button if it's already clicked
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md disabled:bg-gray-200"
                  >
                    <FaCamera />
                  </button>
                )}
            </div>
          </div>
          {photoPreview && (
            <div className="relative rounded-lg shadow-md">
              <img
                src={photoPreview}
                alt="Preview"
                className="max-w-full h-auto rounded-lg"
              />
              <p className="text-[10px] absolute bottom-0 left-0 right-0 bg-white text-center p-1">
                {proofOfDelivery && proofOfDelivery.name}
              </p>
            </div>
          )}

          <video
            ref={videoRef}
            className={`mt-1 w-full ${photoPreview ? "hidden" : ""}`}
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "300px",
              borderRadius: "10px",
              backgroundColor: "#e5e7eb",
            }}
          ></video>
          {!hideButton && videoRef.current && (
            <button
              onClick={handleSnapshot}
              disabled={!buttonClicked} // Disable button if buttonClicked is false
              className={`font-bold bg-teal-500 hover:bg-teal-600 w-full text-white px-4 py-2 rounded-md mt-2 disabled:bg-gray-200${
                photoPreview ? " hidden" : ""
              }`}
            >
              Capture Proof of Delivery
            </button>
          )}

          <div className="flex items-center mt-3 mb-1 ">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              className="ms-2 text-[12px] font-medium text-gray-900 dark:text-gray-300"
            >
              Received by Designated Recipient
            </label>
          </div>
          <div className="flex items-center ">
            <input
              checked
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-2"
              className="ms-2 text-[12px] font-medium text-gray-900 dark:text-gray-300"
            >
              Received by Representative
            </label>
          </div>
          <button
            className="font-bold bg-teal-500 hover:bg-teal-600 w-full text-white px-4 py-2 rounded-md mt-2 disabled:bg-gray-200 justify-center items-center flex flex-row"
            onClick={handleAccept}
          >
            <BsFillBox2HeartFill className="mr-2" />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriverDeliveryConfirmationContext;

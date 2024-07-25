import React, { useState } from "react";
import Axios from "axios";
import { BiSolidMessageDetail } from "react-icons/bi";

const ComplaintFeedbackModal = ({ selectedRow, onClose }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [feedback, setFeedback] = useState(selectedRow.Feedback || "");
  const [status, setStatus] = useState(selectedRow.ComplaintStatus || "");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      console.log("Submitting feedback...");
      const response = await Axios.put(
        "http://localhost:3001/complaints/complaintFeedback",
        {
          feedback: feedback,
          status: status,
          complaintId: selectedRow.ComplaintID, // Ensure correct usage here
        }
      );
      console.log(selectedRow.ComplaintID); // Log the ComplaintID to verify
      console.log("Feedback submitted successfully:", response.data);
      onClose(); // Close the modal after submitting feedback
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center z-100">
      <div className="bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex flex-row items-center">
            <BiSolidMessageDetail className="mr-2" size={25} />
            Complaint Feedback
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
        <div className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-4">
            {/* Left Side */}
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                value={selectedRow.Name}
                type="text"
                name="Name"
                id="Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                disabled
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tracking Number
              </label>
              <input
                value={selectedRow.TrackingNumber}
                type="text"
                name="trackingNumber"
                id="trackingNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                disabled
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Complaint Type
              </label>
              <input
                value={selectedRow.ComplaintType}
                type="text"
                name="complaintType"
                id="complaintType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                disabled
              />
            </div>
            <div className="col-span-4">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Complaint Description
              </label>
              <textarea
                value={selectedRow.Description}
                type="text"
                name="description"
                id="description"
                rows="5"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                disabled
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Attachment
              </label>
              <div className="overflow-x-auto whitespace-nowrap">
                <div className="inline-flex space-x-4">
                  <img
                    src={`http://localhost:3001/uploads/${selectedRow.Attachment}`} // Assuming the server URL is http://localhost:3001
                    alt="Valid License"
                    style={{ maxWidth: "120px", maxHeight: "60px" }} // Adjust the size as needed
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date Filed
              </label>
              <input
                value={new Date(selectedRow.DateFiled).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
                type="text"
                name="complaintDate"
                id="complaintDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                disabled
              />
            </div>
            {/* Right Side */}
            <div className="col-span-1">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>{" "}
              </select>
            </div>
            <div className="col-span-4">
              <label
                htmlFor="feedback"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Admin Feedback
              </label>
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                name="feedback"
                id="feedback"
                rows="5"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end items-center border-t rounded-b">
            <div className="flex-1">
              <p className="text-gray-700 dark:text-gray-300 font-mediumpy-2 mt-2 text-sm">
                Complaint feedback or response should be professional and
                constructive.<br></br> Please ensure your feedback contributes
                to the improvement of our services.
              </p>
            </div>

            <button
              type="button"
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg px-4 py-2 mr-2 mt-2"
              onClick={handleSubmitFeedback}
            >
              Submit Feedback
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-800 font-medium rounded-lg px-4 py-2 mt-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintFeedbackModal;

import React, { useState } from "react";
import ImageModal from "../ui/ImageModal";
import { FaInfoCircle } from "react-icons/fa";
import {
  FaEye,
  FaArchive,
  FaUser,
  FaUserCog,
  FaCar,
  FaUserPlus,
} from "react-icons/fa";
const ViewUserInfoModal = ({ selectedRow, onClose }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openViewModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  function getRoleIcon(accountType) {
    switch (accountType) {
      case "Admin":
        return <FaUserCog />;
      case "Customer":
        return <FaUser />;
      case "Driver":
        return <FaCar />;
      default:
        return null;
    }
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center z-100">
      <div className="relative p-4 max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex flex-row items-center">
              <FaInfoCircle className="mr-2" size={20} />
              View User Information
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
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Account Type
                </label>
                <span className="flex items-center text-xl font-semibold">
                  {getRoleIcon(selectedRow.AccountType)}
                  <span className="ml-1">{selectedRow.AccountType}</span>
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  value={
                    selectedRow.AccountType === "Admin"
                      ? selectedRow.AdminFirstName
                      : selectedRow.AccountType === "Customer"
                      ? selectedRow.CustomerFirstName
                      : selectedRow.AccountType === "Driver"
                      ? selectedRow.DriverFirstName
                      : ""
                  }
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  value={
                    selectedRow.AccountType === "Admin"
                      ? selectedRow.AdminLastName
                      : selectedRow.AccountType === "Customer"
                      ? selectedRow.CustomerLastName
                      : selectedRow.AccountType === "Driver"
                      ? selectedRow.DriverLastName
                      : ""
                  }
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
                </label>
                <input
                  value={selectedRow.EmailAddress}
                  type="text"
                  name="emailAddress"
                  id="emailAddress"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date Joined
                </label>
                <input
                  value={new Date(selectedRow.DateCreated).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                  type="text"
                  name="dateJoined"
                  id="dateJoined"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {isViewModalOpen && (
        <ImageModal isOpen={isViewModalOpen} onClose={closeViewModal} />
      )}
    </div>
  );
};

export default ViewUserInfoModal;

import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function BookingModalSuccess({ isOpen, onClose }) {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      {modalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50 transition-opacity duration-300"
        >
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative pt-4 bg-white rounded-lg shadow transform transition-all duration-1000 opacity-100 scale-100 ease-in-out">
              <div className="container md:my-10">
                <div className="flex flex-col items-center text-teal-500">
                  <FaCheckCircle size={80} />
                </div>
                <h3 className="mt-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
                  Congratulations!
                </h3>
                <p className="mb-1 text-[12px] text-center text-gray-500 dark:text-gray-400">
                  You have booked successfully.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingModalSuccess;

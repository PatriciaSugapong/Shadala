import React from "react";

const ImageModal = ({ imageSrc, closeModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
      <div className="bg-white p-4 rounded-lg relative m-10 sm:max-w-sm lg:max-w-md xl:max-w-lg">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={imageSrc}
          alt="Enlarged Image"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;

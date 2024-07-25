import React, { useState } from "react";
import axios from "axios";
import { FaArchive } from "react-icons/fa";

function ArchiveComplaint({ onClose, onArchive }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center z-100">
      <div className="relative p-4 max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex flex-row items-center">
              <FaArchive className="mr-2" size={20} />
              Archive Complaint
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
            <p className="text-sm text-gray-900 dark:text-white">
              Are you sure you want to archive this complaint?
            </p>
          </div>
          <div className="flex justify-end p-4 md:p-5 border-t rounded-b">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2 mr-2"
              onClick={onArchive}
            >
              Yes, Archive
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-800 font-medium rounded-lg px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchiveComplaint;

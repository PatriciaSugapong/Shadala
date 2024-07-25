import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export const Toast = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {visible && (
        <div
          id="toast-simple"
          className="fixed top-0 right-0 left-0 z-50 flex items-center w-full m-2 max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 transition-transform duration-500 ease-in-out transform translate-y-0"
          role="alert"
        >
          <FaCheckCircle />
          <div className="ps-4 text-sm font-normal font-Montserrat">
            {message}
          </div>
        </div>
      )}
    </>
  );
};

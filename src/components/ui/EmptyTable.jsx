import React from "react";
import { FiAlertCircle } from "react-icons/fi";

function EmptyTable() {
  return (
    <div>
      <div className="flex items-center justify-center text-gray-500 mt-5">
        <FiAlertCircle className="text-6xl" />
      </div>
      <h3 className="mt-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
        Uh-Oh!
      </h3>
      <p className="text-center text-md mt-2">
        There is no data available at the moment.
      </p>
    </div>
  );
}

export default EmptyTable;

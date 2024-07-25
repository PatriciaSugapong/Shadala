import React from "react";
import DriverNavBar from "./DriverNavBar";
import DriverSupportContext from "../../contexts/Driver/DriverSupportContext";
import logo from "../../assets/shadala.png";

function DriverSupport() {
  return (
    <div className="flex flex-col h-screen">
      <img src={logo} className="h-5 mx-auto mt-2" />

      <DriverSupportContext />
      <div className="bg-white border-t border-gray-200 font-Montserrat rounded-b-lg fixed bottom-0 left-0 right-0">
        <DriverNavBar />
      </div>
    </div>
  );
}

export default DriverSupport;

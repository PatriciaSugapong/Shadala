import React from "react";
import DriverNavBar from "./DriverNavBar";
import DriverPickupContext from "../../contexts/Driver/DriverPickupContext";
import logo from "../../assets/shadala.png";
function Driver() {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <img src={logo} className="h-5 mx-auto mt-2" />
        <DriverPickupContext />

        <div className="bg-white border-t border-gray-200 font-Montserrat rounded-b-lg fixed bottom-0 left-0 right-0">
          <DriverNavBar />
        </div>
      </div>
    </div>
  );
}

export default Driver;

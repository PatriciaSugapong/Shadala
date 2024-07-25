import React from "react";
import DriverNavBar from "./DriverNavBar";
import DriverParcelTransitContext from "../../contexts/Driver/DriverParcelTransitContext";
import logo from "../../assets/shadala.png";

function DriverParcelTransit() {
  return (
    <div className="flex flex-col h-screen">
      <img src={logo} className="h-5 mx-auto mt-2" />
      <DriverParcelTransitContext />
      <div className="bg-white border-t border-gray-200 font-Montserrat rounded-b-lg fixed bottom-0 left-0 right-0">
        <DriverNavBar />
      </div>
    </div>
  );
}

export default DriverParcelTransit;

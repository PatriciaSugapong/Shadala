import React from "react";
import icon from "../../assets/icon.png";
import { AiOutlineClose } from "react-icons/ai";
import { TbZoomQuestion } from "react-icons/tb";

function TrackParcelModal({ onClose, parcelInfo, error }) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img className="w-auto h-14" src={icon} alt="Logo" />
              <h3 className="ml-2 text-xl font-semibold text-gray-800">
                Tracking Details
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : !parcelInfo || parcelInfo.length === 0 ? (
            <div className="text-center text-gray-800">
              <div className="flex items-center justify-center">
                <TbZoomQuestion size={100} className="text-teal-500" />
              </div>
              <p>No parcel information available.</p>
            </div>
          ) : (
            parcelInfo.map((parcel, index) => (
              <div key={index}>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">Tracking Number:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {parcel.TrackingNumber}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-4 mb-6">
                  {/* Pick Up */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pick Up:</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {parcel.ParcelOrigin}
                    </p>
                  </div>
                  {/* Destination */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Destination:</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {parcel.ParcelDestination}
                    </p>
                  </div>
                  {/* Sender Info */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Sender:</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {parcel.SenderName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {parcel.SenderContactNum}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {parcel.SenderBlockNum}
                    </p>
                  </div>
                  {/* Receiver Info */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Receiver:</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {parcel.ReceiverName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {parcel.ReceiverContactNum}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {parcel.ReceiverBlockNum}
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">Vehicle Type:</p>
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    {parcel.VehicleType}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">Status:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {parcel.BookingStatus}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackParcelModal;

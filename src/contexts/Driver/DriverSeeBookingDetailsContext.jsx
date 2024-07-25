import React, { useState, useEffect } from "react";
import {
  FaDolly,
  FaRegCircleDot,
  FaCircleInfo,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";
import { RiMapPinFill, RiCashFill } from "react-icons/ri";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import DriverAcceptModal from "./DriverAcceptModalContext"; // Import the DriverAcceptModal component
import logo from "../../assets/shadala.png"; // Import your driver image
import { MdOutlineClose } from "react-icons/md";

function DriverSeeBookingDetailsContext({ booking }) {
  const [pickupCoordinates, setPickupCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentComponent, setCurrentComponent] = useState("DriverStatus");
  const [selectedBooking, setSelectedBooking] = useState(null); // State to store the selected booking

  useEffect(() => {
    const findCoordinates = async (address, setCoordinates) => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${address}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch coordinates");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ latitude: lat, longitude: lon });
        } else {
          console.log("No data returned from the server");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (booking.ParcelOrigin && booking.ParcelDestination) {
      findCoordinates(booking.ParcelOrigin, setPickupCoordinates);
      findCoordinates(booking.ParcelDestination, setDestinationCoordinates);
    }
  }, [booking.ParcelOrigin, booking.ParcelDestination]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (
        pickupCoordinates.latitude !== "" &&
        destinationCoordinates.latitude !== ""
      ) {
        try {
          const response = await fetch(
            `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624826fdf647f2f548a1a6f0b3336416a6ef&start=${pickupCoordinates.longitude},${pickupCoordinates.latitude}&end=${destinationCoordinates.longitude},${destinationCoordinates.latitude}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch route data");
          }
          const data = await response.json();
          const route = data.features[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
          setRouteCoordinates(route);
        } catch (error) {
          console.error("Error fetching route data:", error);
        }
      }
    };

    fetchRoute();
  }, [pickupCoordinates, destinationCoordinates]);

  const pickupIcon = new L.Icon({
    iconUrl: require("../../assets/pickup-icon.png"),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const destinationIcon = new L.Icon({
    iconUrl: require("../../assets/destination-icon.png"),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const MapCenter = () => {
    const map = useMap();
    useEffect(() => {
      if (routeCoordinates.length > 0) {
        map.fitBounds(routeCoordinates);
      }
    }, [map, routeCoordinates]);

    return null;
  };
  const handleAccept = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeDriverAcceptModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full w-full">
        <img src={logo} alt="Driver" className="m-2 mx-auto h-5" />

        {/* Modal */}
        <DriverAcceptModal
          isOpen={isModalOpen}
          onClose={closeDriverAcceptModal}
          booking={selectedBooking}
        />

        <div className="mx-5 bg-white rounded-lg shadow-md overflow-auto mb-2">
          <div className="bg-teal-500 text-white px-4 py-1 rounded-t-lg flex flex-row items-center justify-between">
            <div className="flex items-center">
              <FaDolly className="mr-2" />
              <h2 className="text-lg font-semibold">For Pickup</h2>
            </div>
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <MdOutlineClose />
            </button>
          </div>
          <div className="p-2 text-sm relative">
            <div className="mb-1">
              <p className="font-bold text-gray-800">
                {booking.FirstName} {booking.LastName}
              </p>
            </div>
            <div className="ml-4 mb-1 flex flex-row items-center">
              <FaRegCircleDot />
              <p className="ml-2 text-gray-800 font-semibold">
                {booking.ParcelOrigin}
              </p>
            </div>
            <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2 ">
              <p className="text-[12px] text-gray-700">
                <b>Sender Name:</b> {booking.SenderName} <br />
                <b>Phone Number:</b> {booking.SenderContactNum} <br />
                <b>Block/Floor/Room:</b> 123A
              </p>
            </div>
            <div className="ml-4 mb-1 flex flex-row items-center">
              <RiMapPinFill />
              <p className="ml-2 text-gray-800 font-semibold">
                {booking.ParcelDestination}
              </p>
            </div>
            <div className="ml-4 mt-1 bg-teal-100 rounded-lg p-2 mb-2 ">
              <p className="text-[12px] text-gray-700">
                <b>Receiver Name:</b> {booking.ReceiverName} <br />
                <b>Phone Number:</b> {booking.ReceiverContactNum} <br />
                <b>Block/Floor/Room:</b> 123A
              </p>
            </div>

            <div className="relative z-0 w-full mt-3 rounded-2xl group mb-2">
              <MapContainer
                center={[14.5995, 120.9842]} // Default center to Manila
                zoom={10}
                style={{
                  height: "250px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                {/* Tile Layer */}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Pickup Marker */}
                {pickupCoordinates.latitude !== "" && (
                  <Marker
                    position={[
                      parseFloat(pickupCoordinates.latitude),
                      parseFloat(pickupCoordinates.longitude),
                    ]}
                    icon={pickupIcon}
                  >
                    <Popup>Pickup Location: {booking.ParcelOrigin}</Popup>
                  </Marker>
                )}

                {/* Drop-off Marker */}
                {destinationCoordinates.latitude !== "" && (
                  <Marker
                    position={[
                      parseFloat(destinationCoordinates.latitude),
                      parseFloat(destinationCoordinates.longitude),
                    ]}
                    icon={destinationIcon}
                  >
                    <Popup>
                      Drop-off Location: {booking.ParcelDestination}
                    </Popup>
                  </Marker>
                )}

                {/* Route */}
                {routeCoordinates.length > 0 && (
                  <Polyline positions={routeCoordinates} color="blue" />
                )}

                {/* Custom Map Center Component */}
                <MapCenter />
              </MapContainer>
            </div>
            <div className="font-bold mb-1 text-teal-800 flex flex-col items-start">
              <div className="flex flex-row items-center">
                <RiCashFill size={20} className="mr-1" />
                <p>PHP 100.00</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-xs text-teal-800 mr-2">Cash on Delivery</p>
              </div>
              <div className="flex">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 items-center flex flex-row mr-2">
                  <FaCircleXmark className="mr-1" />
                  Decline
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 items-center flex flex-row"
                  onClick={() => handleAccept(booking)}
                >
                  <FaCircleCheck className="mr-1" />
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverSeeBookingDetailsContext;

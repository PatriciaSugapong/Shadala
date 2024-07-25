import React, { useState, useEffect } from "react";
import { FaDolly, FaRegCircleDot } from "react-icons/fa6";
import { FaTruckLoading } from "react-icons/fa";
import { BsHouseCheckFill } from "react-icons/bs";
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
import Axios from "axios";
import { getLoggedInUser } from "../../utils/userUtils";
import DriverDeliveryConfirmationContext from "./DriverDeliveryConfirmationContext";

function DriverParcelTransitContext({ booking }) {
  console.log("Booking in Transit:", booking);
  console.log("Current info passed to the page:", booking); // Debug log

  const [parcelStatus, setParcelStatus] = useState("Pick Up");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [parcelOrigin, setParcelOrigin] = useState(booking.ParcelOrigin);
  const [parcelDestination, setParcelDestination] = useState(
    booking.ParcelDestination
  );

  const [pickupCoordinates, setPickupCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get the user's current location using browser geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  useEffect(() => {
    const getCoordinates = async (address) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coordinates");
        }
        const data = await response.json();
        if (data.length === 0) {
          throw new Error("No results found for the address");
        }
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
      }
    };

    const fetchCoordinates = async () => {
      const originCoordinates = await getCoordinates(parcelOrigin);
      const destinationCoordinates = await getCoordinates(parcelDestination);
      if (originCoordinates && destinationCoordinates) {
        // Set the coordinates in state
        setPickupCoordinates(originCoordinates);
        setDestinationCoordinates(destinationCoordinates);
      }
    };

    fetchCoordinates();
  }, [parcelOrigin, parcelDestination]);

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const pickupIcon = new L.Icon({
    iconUrl: require("../../assets/pickup-icon.png"),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const courierIcon = new L.Icon({
    iconUrl: require("../../assets/courier.png"),
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

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await Axios.get(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624826fdf647f2f548a1a6f0b3336416a6ef&start=${pickupCoordinates.longitude},${pickupCoordinates.latitude}&end=${destinationCoordinates.longitude},${destinationCoordinates.latitude}`
        );
        const { features } = response.data;
        if (features && features.length > 0) {
          const route = features[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
          setRouteCoordinates(route);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRoute();
  }, [pickupCoordinates, destinationCoordinates]);

  const handlePickUp = async () => {
    try {
      const loggedInUser = getLoggedInUser();
      const userID = loggedInUser.UserID; // Make an HTTP request to update the booking status
      const response = await Axios.put(
        `http://localhost:3001/bookings/updateBookingStatus/${booking.BookingID}`,
        { userID: userID, bookingStatus: "In Transit" } // Include the booking status in the request body
      );
      setSelectedBooking(booking);
      console.log("Booking status updated successfully:", response.data);
      // Update the parcel status in the frontend if needed
      setParcelStatus("In Transit");
    } catch (error) {
      console.error("Error updating booking status:", error);
      // Handle any errors here
    }
  };

  const handleDelivery = async () => {
    try {
      const loggedInUser = getLoggedInUser();
      const userID = loggedInUser.UserID; // Make an HTTP request to update the booking status
      const response = await Axios.put(
        `http://localhost:3001/bookings/updateBookingStatus/${booking.BookingID}`,
        { userID: userID, bookingStatus: "Delivered" } // Include the booking status in the request body
      );
      setSelectedBooking(booking);
      console.log("Booking status updated successfully:", response.data);
      // Update the parcel status in the frontend if needed
      setParcelStatus("Delivered");
    } catch (error) {
      console.error("Error updating booking status:", error);
      // Handle any errors here
    }
  };

  return (
    <div className="">
      <h1 className="text-left text-sm mb-2 font-semibold text-gray-800">
        In-Transit Delivery
      </h1>
      {/* Conditionally render DriverDeliveryConfirmationContext component */}
      {parcelStatus === "Delivered" && (
        <DriverDeliveryConfirmationContext booking={selectedBooking} />
      )}
      <div className={parcelStatus === "Delivered" ? "hidden" : ""}>
        <div className="relative z-0 w-full mt-3 rounded-t-2xl group mb-2">
          {/* <MapContainer
            center={[14.5995, 120.9842]} // Default center to Manila
            zoom={10}
            style={{ height: "250px", width: "100%", borderRadius: "10px" }}
          > */}
          {/* Tile Layer */}
          {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

          <MapContainer
            center={[userLocation?.latitude || 0, userLocation?.longitude || 0]}
            zoom={13}
            style={{ height: "250px", width: "100%", borderRadius: "10px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Pickup Marker */}
            {pickupCoordinates.latitude !== 0 && (
              <Marker
                position={[
                  pickupCoordinates.latitude,
                  pickupCoordinates.longitude,
                ]}
                icon={pickupIcon}
              >
                <Popup>Pickup Location: {parcelOrigin}</Popup>
              </Marker>
            )}
            {userLocation && (
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={courierIcon}
              >
                <Popup>You are here</Popup>
              </Marker>
            )}
            {/* Drop-off Marker */}
            {destinationCoordinates.latitude !== 0 && (
              <Marker
                position={[
                  destinationCoordinates.latitude,
                  destinationCoordinates.longitude,
                ]}
                icon={destinationIcon}
              >
                <Popup>Drop-off Location: {parcelDestination}</Popup>
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
        <div className="bg-teal-500 text-white px-4 py-1 rounded-t-lg flex flex-row items-center">
          <FaDolly className="mr-2" />
          <h2 className="text-lg font-semibold">
            {parcelStatus === "Pick Up" ? "For Pickup" : "In Transit"}
          </h2>
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
              <b>Block/Floor/Room:</b> {booking.SenderBlockNum}
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
              <b>Block/Floor/Room:</b> {booking.ReceiverBlockNum}
            </p>
          </div>

          <div className="flex items-center">
            <div className="font-bold mb-1 text-teal-800 flex flex-col items-start">
              <div className="flex flex-row items-center">
                <RiCashFill size={20} className="mr-1" />
                <p>PHP {booking.TotalPrice}</p>
              </div>
              <p className="text-xs text-teal-800">Cash on Delivery</p>
            </div>
            <div className="ml-auto flex flex-col">
              <p className="text-xs text-teal-800 mb-1">Update Parcel Status</p>
              {parcelStatus === "Pick Up" && (
                <button
                  onClick={handlePickUp}
                  className="justify-center font-bold bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 items-center flex flex-row h-10 shadow-md"
                >
                  <FaTruckLoading size={20} className="mr-1" />
                  Picked Up
                </button>
              )}
              {parcelStatus === "In Transit" && (
                <button
                  onClick={handleDelivery}
                  className="justify-center font-bold bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 items-center flex flex-row h-10 shadow-md"
                >
                  <BsHouseCheckFill size={20} className="mr-1" />
                  Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverParcelTransitContext;

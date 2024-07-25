import React, { useState, useEffect } from "react";
import Axios from "axios";
import { RiMapPinFill } from "react-icons/ri";
import { FaRegCircleDot } from "react-icons/fa6";
import {
  FaMotorcycle,
  FaCarSide,
  FaTruckPickup,
  FaTruck,
  FaTruckMoving,
  FaMoneyBillAlt,
  FaClock,
} from "react-icons/fa";
import { RiTruckFill } from "react-icons/ri";
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
import { getLoggedInUser } from "../../utils/userUtils";
import ConfirmBookingModal from "../../components/ui/ConfirmBookingModal";
import SuccessToast from "../../components/ui/SuccessToast";
import BookingLimitModal from "../../components/ui/BookingLimitModal";

function BookContext() {
  const [senderContactNum, setSenderContactNum] = useState("");
  const [senderBlockNum, setSenderBlockNum] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverContactNum, setReceiverContactNum] = useState("");
  const [receiverBlockNum, setReceiverBlockNum] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [parcelOrigin, setParcelOrigin] = useState("");
  const [parcelDestination, setParcelDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  const closeLimitModal = () => {
    setIsLimitModalOpen(false);
  };

  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };

  const [userID, setUserID] = useState(null);

  // Retrieve the logged-in user ID when the component mounts
  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUserID(loggedInUser.UserID);
      console.log("Retrieved userID:", loggedInUser.UserID);
    } else {
      console.log("User not logged in or session data missing.");
    }
  }, []);

  useEffect(() => {
    // Fetch pending bookings count when userID is available
    const fetchPendingBookingsCount = async () => {
      try {
        if (!userID) {
          console.log(
            "User ID is missing. Unable to fetch pending bookings count."
          );
          return;
        }

        console.log("Fetching pending bookings count for user ID:", userID);
        const response = await Axios.get(
          `http://localhost:3001/bookings/limitBooking/${userID}`
        );
        console.log(
          "Pending bookings count fetched successfully:",
          response.data.data // Accessing the count from response.data.data
        );
        setPendingBookingsCount(response.data.data);

        // Check if pending bookings count equals 3
        console.log("Pending bookings count:", response.data.data.length);
        if (response.data.data.length === 3) {
          console.log("Opening booking limit modal...");
          setIsLimitModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching pending bookings count:", error);
      }
    };

    // Fetch pending bookings count
    fetchPendingBookingsCount();
  }, [userID]); // Fetch booking history whenever userID changes

  const resetForm = () => {
    setSenderContactNum("");
    setSenderBlockNum("");
    setSenderName("");
    setReceiverContactNum("");
    setReceiverBlockNum("");
    setReceiverName("");
    setParcelOrigin("");
    setParcelDestination("");
    setVehicleType("");
  };

  const bookVehicle = async (e) => {
    e.preventDefault();

    try {
      // Ensure userID is available before making the API call
      if (!userID) {
        console.log("User ID is missing. Unable to book vehicle.");
        return;
      }

      const formData = {
        parcelOrigin: parcelOrigin,
        senderName: senderName,
        senderContactNum: senderContactNum,
        senderBlockNum: senderBlockNum,
        parcelDestination: parcelDestination,
        receiverName: receiverName,
        receiverContactNum: receiverContactNum,
        receiverBlockNum: receiverBlockNum,
        vehicleType: vehicleType,
        totalPrice: totalPrice,
        userID: userID,
      };

      const response = await Axios.post(
        "http://localhost:3001/bookings/book",
        formData
      );

      console.log(response.data);
      resetForm();
      setShowModal(false);
      setShowSuccessToast(true);
    } catch (error) {
      console.error("Error booking vehicle:", error);
    }
  };

  const handleBookNowClick = () => {
    setBookingDetails({
      parcelOrigin: parcelOrigin,
      senderName: senderName,
      senderContactNum: senderContactNum,
      senderBlockNum: senderBlockNum,
      parcelDestination: parcelDestination,
      receiverName: receiverName,
      receiverContactNum: receiverContactNum,
      receiverBlockNum: receiverBlockNum,
      vehicleType: vehicleType,
      totalPrice: totalPrice,
    });
    setShowModal(true);
  };

  const cancelBooking = () => {
    setShowModal(false);
  };

  const [pickupCoordinates, setPickupCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: "",
    longitude: "",
  });

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const [distance, setDistance] = useState(0);
  const [estimatedTravelTime, setEstimatedTravelTime] = useState(0);

  const handleVehicleTypeChange = (e) => {
    const selectedVehicleType = e.target.value;
    setVehicleType(selectedVehicleType);
  };

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

  const findPickUpAddress = () => {
    var pickUpAddress = document.querySelector("#pickUpAddress");
    var url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
      pickUpAddress.value;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Optionally, you can log the data here
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setPickupCoordinates({ latitude: lat, longitude: lon });
        } else {
          console.log("No data returned from the server");
        }
      })
      .catch((err) => console.log(err));
  };

  const findDestinationAddress = () => {
    var destinationAddress = document.querySelector("#destinationAddress");
    var url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
      destinationAddress.value;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setDestinationCoordinates({ latitude: lat, longitude: lon });
        } else {
          console.log("No data returned from the server");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (
        pickupCoordinates.latitude !== 0 &&
        destinationCoordinates.latitude !== 0
      ) {
        try {
          const response = await fetch(
            `https://api.openrouteservice.org/v2/directions/driving-car?api_key=INSERTAPIKEYHERE&start=${pickupCoordinates.longitude},${pickupCoordinates.latitude}&end=${destinationCoordinates.longitude},${destinationCoordinates.latitude}`
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

  useEffect(() => {
    if (
      pickupCoordinates.latitude &&
      pickupCoordinates.longitude &&
      destinationCoordinates.latitude &&
      destinationCoordinates.longitude &&
      vehicleType
    ) {
      const distance = calculateDistance(
        pickupCoordinates.latitude,
        pickupCoordinates.longitude,
        destinationCoordinates.latitude,
        destinationCoordinates.longitude
      );

      const travelTime = calculateEstimatedTravelTime(vehicleType, distance);

      const baseFare = calculateBaseFare(vehicleType);

      let totalPrice = baseFare * distance;

      const discountPer100Km = 50;
      const discount = Math.floor(distance / 100) * discountPer100Km;

      totalPrice -= discount;

      totalPrice = Math.max(totalPrice, 0);

      setTotalPrice(totalPrice);
      setEstimatedTravelTime(travelTime);
    }
  }, [pickupCoordinates, destinationCoordinates, vehicleType]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  function calculateBaseFare(vehicleType) {
    let baseFare = 0;

    switch (vehicleType) {
      case "Motorcycle":
        baseFare = 40;
        break;
      case "200kg Sedan":
        baseFare = 70;
        break;
      case "600kg MPV":
        baseFare = 150;
        break;
      case "1000kg Small Truck":
        baseFare = 300;
        break;
      case "2000kg Medium Truck":
        baseFare = 500;
        break;
      case "3000kg Large Truck":
        baseFare = 800;
        break;
      default:
        console.log("Invalid vehicle type");
    }

    return baseFare;
  }
  function calculateEstimatedTravelTime(vehicleType, distance) {
    let travelTime = 0;

    const averageSpeeds = {
      Motorcycle: 15,
      "200kg Sedan": 13,
      "600kg MPV": 12,
      "1000kg Small Truck": 10,
      "2000kg Medium Truck": 8,
      "3000kg Large Truck": 3,
    };

    const averageSpeed = averageSpeeds[vehicleType];
    if (averageSpeed) {
      travelTime = distance / averageSpeed;
    }

    travelTime = Math.max(0, travelTime);
    // Round the travel time to the nearest minute
    travelTime = Math.round(travelTime * 60) / 60;

    return travelTime;
  }

  // Calculate hours and minutes separately
  const travelTimeHours = Math.floor(estimatedTravelTime);
  // Convert the remaining fraction of hours to minutes
  const remainingMinutes = (estimatedTravelTime - travelTimeHours) * 60;
  // Round minutes to the nearest integer
  const travelTimeMinutes = Math.round(remainingMinutes);

  const handlePickupLocationChange = (event) => {
    const { value } = event.target;
    setParcelOrigin(value);
    if (!value) {
      setPickupCoordinates({ longitude: "", latitude: "" });
    }
  };

  const handleDropoffLocationChange = (event) => {
    const { value } = event.target;
    setParcelDestination(value);
    if (!value) {
      setDestinationCoordinates({ longitude: "", latitude: "" });
    }
  };

  return (
    <div>
      <div className="font-Montserrat w-full max-w-[1240px] mx-auto over bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 p-5">
        <h1 className="text-left my-2 font-semibold">Booking Details</h1>
        <div className="outline outline-gray-100 rounded-xl p-5 ">
          <div className="flex flex-wrap">
            {/* Pick-up section */}
            <div className="flex flex-col flex-grow w-full md:w-1/2">
              <div className="flex items-center">
                {/* Pick-up icon */}
                <FaRegCircleDot className="mr-2 text-teal-500" />
                <div className="relative z-0 w-full ml-2 group">
                  {/* Pick-up input */}
                  <input
                    type="text"
                    name="pickUpAddress"
                    id="pickUpAddress"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={parcelOrigin}
                    onChange={handlePickupLocationChange}
                    onBlur={findPickUpAddress}
                  />
                  <label
                    htmlFor="pickUpAddress"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Pick-up Location
                  </label>
                </div>
              </div>
              {/* Pick-up coordinates */}
              {pickupCoordinates.longitude && pickupCoordinates.latitude && (
                <p className="text-gray-600 text-sm my-2 ml-8 hidden">
                  Longitude: {pickupCoordinates.longitude}, Latitude:{" "}
                  {pickupCoordinates.latitude}
                </p>
              )}
              {/* Sender info */}
              {parcelOrigin && (
                <div
                  className="bg-gray-100 rounded-xl p-5 ml-8 max-w-md my-5"
                  name="senderInfo"
                >
                  <div>
                    <div className="mb-2">
                      <label
                        className="block text-sm font-medium text-gray-800 text-left"
                        htmlFor="senderName"
                      >
                        Sender Name
                      </label>
                      <input
                        value={senderName}
                        name="senderName"
                        onChange={(e) => setSenderName(e.target.value)}
                        type="text"
                        id="senderName"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        className="block text-sm font-medium text-gray-800 text-left "
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <div class="flex flex-span items-center">
                        <div
                          id="phoneNumber"
                          class="mt-1 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700  dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        >
                          +63{" "}
                        </div>
                        <div class="relative w-full">
                          <input
                            value={senderContactNum}
                            name="SenderContactNumber"
                            onChange={(e) =>
                              setSenderContactNum(e.target.value)
                            }
                            type="text"
                            id="phone-input"
                            class="mt-1 block p-2.5 w-full z-20 text-sm text-gray-500 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder=""
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="blookFloorRoom"
                    >
                      Block / Floor / Room
                    </label>
                    <input
                      value={senderBlockNum}
                      name="senderblookFloorRoom"
                      onChange={(e) => setSenderBlockNum(e.target.value)}
                      type="text"
                      id="senderblookFloorRoom"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Drop-off section */}
            <div className="flex flex-col flex-grow w-full md:w-1/2">
              <div className="flex items-center">
                {/* Drop-off icon */}
                <RiMapPinFill className="mr-2 text-teal-500" />
                <div className="relative z-0 w-full ml-2 group">
                  {/* Drop-off input */}
                  <input
                    type="text"
                    name="destinationAddress"
                    id="destinationAddress"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={parcelDestination}
                    onChange={handleDropoffLocationChange}
                    onBlur={findDestinationAddress}
                  />
                  <label
                    htmlFor="destinationAddress"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Drop-off Location
                  </label>
                </div>
              </div>
              {/* Drop-off coordinates */}
              {destinationCoordinates.longitude &&
                destinationCoordinates.latitude && (
                  <p className="text-gray-600 text-sm my-2 ml-8 hidden">
                    Longitude: {destinationCoordinates.longitude}, Latitude:{" "}
                    {destinationCoordinates.latitude}
                  </p>
                )}
              {/* Receiver info */}
              {parcelDestination && (
                <div
                  className="bg-gray-100 rounded-xl p-5 ml-8 max-w-md my-5 transition-all duration-300 ease-in-out transform "
                  name="receiverInfo"
                >
                  <div className="">
                    <div className="mb-2">
                      <label
                        className="block text-sm font-medium text-gray-800 text-left"
                        htmlFor="receiverName"
                      >
                        Receiver Name
                      </label>
                      <input
                        value={receiverName}
                        name="receiverName"
                        onChange={(e) => setReceiverName(e.target.value)}
                        type="text"
                        id=""
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        className="block text-sm font-medium text-gray-800 text-left "
                        htmlFor="receiverContactNumber"
                      >
                        Phone Number
                      </label>
                      <div class="flex flex-span items-center">
                        <div
                          id="receiverContactNumberdiv"
                          class="mt-1 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700  dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        >
                          +63{" "}
                        </div>
                        <div class="relative w-full">
                          <input
                            value={receiverContactNum}
                            name="receiverContactNumber"
                            onChange={(e) =>
                              setReceiverContactNum(e.target.value)
                            }
                            type="text"
                            id="phone-input"
                            class="mt-1 block p-2.5 w-full z-20 text-sm text-gray-500 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder=""
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="receiverblookFloorRoom"
                    >
                      Block / Floor / Room
                    </label>
                    <input
                      value={receiverBlockNum}
                      name="receiverblookFloorRoom"
                      onChange={(e) => setReceiverBlockNum(e.target.value)}
                      type="text"
                      id="receiverblookFloorRoom"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mt-3 rounded-2xl group">
            <MapContainer
              center={[14.5995, 120.9842]} // Default center to Manila
              zoom={10}
              style={{ height: "400px", width: "100%", borderRadius: "10px" }}
            >
              {/* Tile Layer */}
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
        </div>
        <hr />
        <label
          className="block font-bold text-gray-800 text-left my-2"
          htmlFor="vehicleType"
        >
          Vehicle Type
        </label>
        <div className="flex flex-wrap justify-center gap-3 my-5 ">
          <label class="cursor-pointer">
            <input
              type="radio"
              class="peer sr-only"
              name="pricing"
              value="Motorcycle"
              onChange={handleVehicleTypeChange}
            />{" "}
            <div class="w-[170px] max-w-xl rounded-md bg-white py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-teal-600 peer-checked:ring-teal-400 peer-checked:ring-offset-2 outline outline-2 outline-gray-100">
              <FaMotorcycle size={50} />
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500 ">
                    Motorcyle
                  </p>
                  <div className="ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                      />
                    </svg>
                  </div>
                </div>
                <p>
                  Up to <span class="text-lg font-bold mr-2">20 kg</span>
                </p>

                <p className="text-sm font-bold text-[11px]">₱49 Base Fare</p>
              </div>
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              type="radio"
              class="peer sr-only"
              name="pricing"
              value="200kg Sedan"
              onChange={handleVehicleTypeChange}
            />{" "}
            <div class="w-[170px] max-w-xl rounded-md bg-white py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-teal-600 peer-checked:ring-teal-400 peer-checked:ring-offset-2 outline outline-2 outline-gray-100">
              <FaCarSide size={50} />
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500 ">
                    Sedan
                  </p>
                  <div className="ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                      />
                    </svg>
                  </div>
                </div>
                <p>
                  Up to <span class="text-lg font-bold mr-2">200 kg</span>
                </p>
                <p className="text-sm font-bold text-[11px]">₱100 Base Fare</p>
              </div>
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              type="radio"
              class="peer sr-only"
              name="pricing"
              value="600kg MPV"
              onChange={handleVehicleTypeChange}
            />{" "}
            <div class="w-[170px] max-w-xl rounded-md bg-white py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-teal-600 peer-checked:ring-teal-400 peer-checked:ring-offset-2 outline outline-2 outline-gray-100">
              <FaTruckPickup size={50} />
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500 ">
                    MPV
                  </p>
                  <div className="ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                      />
                    </svg>
                  </div>
                </div>
                <p>
                  Up to <span class="text-lg font-bold mr-2">600 kg</span>
                </p>

                <p className="text-sm font-bold text-[11px]">₱220 Base Fare</p>
              </div>
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              type="radio"
              class="peer sr-only"
              name="pricing"
              value="1000kg Small Truck"
              onChange={handleVehicleTypeChange}
            />{" "}
            <div class="w-[170px] max-w-xl rounded-md bg-white py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-teal-600 peer-checked:ring-teal-400 peer-checked:ring-offset-2 outline outline-2 outline-gray-100">
              <RiTruckFill size={50} />
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500 ">
                    Small Truck
                  </p>
                  <div className="ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                      />
                    </svg>
                  </div>
                </div>
                <p>
                  Up to <span class="text-lg font-bold mr-2">1000 kg</span>
                </p>

                <p className="text-sm font-bold text-[11px]">₱310 Base Fare</p>
              </div>
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              type="radio"
              class="peer sr-only"
              name="pricing"
              value="2000kg Medium Truck"
              onChange={handleVehicleTypeChange}
            />{" "}
            <div class="w-[190px] max-w-xl rounded-md bg-white py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-teal-600 peer-checked:ring-teal-400 peer-checked:ring-offset-2 outline outline-2 outline-gray-100">
              <FaTruck size={50} />
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500 ">
                    Medium Truck
                  </p>
                  <div className="ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                      />
                    </svg>
                  </div>
                </div>
                <p>
                  Up to <span class="text-lg font-bold mr-2">2000 kg</span>
                </p>

                <p className="text-sm font-bold text-[11px]">
                  ₱1,160 Base Fare
                </p>
              </div>
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              type="radio"
              class="peer sr-only"
              name="pricing"
              value="3000kg Large Truck"
              onChange={handleVehicleTypeChange}
            />
            <div class="w-[190px] max-w-xl rounded-md bg-white py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-teal-600 peer-checked:ring-teal-400 peer-checked:ring-offset-2 outline outline-2 outline-gray-100">
              <FaTruckMoving size={50} />
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500 ">
                    Large Truck
                  </p>
                  <div className="ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                      />
                    </svg>
                  </div>
                </div>
                <p>
                  Up to <span class="text-lg font-bold mr-2">3000 kg</span>
                </p>

                <p className="text-sm font-bold text-[11px]">
                  ₱2,000 Base Fare
                </p>
              </div>
            </div>
          </label>
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className="flex-col">
            <p className="font-semibold flex items-center">
              <span>EDT</span>
              <span className="flex items-center ml-3">
                <FaClock className="mr-1" />
                {travelTimeHours} hours {travelTimeMinutes} minutes
              </span>
            </p>
            <p className="font-semibold flex items-center">
              <span>Total Price</span>
              <span className="font-bold ml-3 text-[25px]">
                ₱{totalPrice.toFixed(2)}
              </span>
            </p>
            <p className="font-medium text-xs">Cash on Delivery </p>
          </div>
          <div>
            <button
              onClick={handleBookNowClick}
              className="w-full px-8 py-3 rounded-[20px] block text-white font-semibold bg-teal-500 transition-colors duration-150 border border-gray-300 focus:shadow-outline hover:bg-teal-700 hover:text-teal-100"
            >
              Book Now
            </button>
          </div>

          {showModal && bookingDetails && (
            <ConfirmBookingModal
              bookingDetails={bookingDetails}
              onConfirm={bookVehicle}
              onClose={cancelBooking}
            />
          )}

          {showSuccessToast && <SuccessToast message="Booking successful!" />}
          {/* Modal to inform user about pending bookings limit */}
          {isLimitModalOpen && (
            <BookingLimitModal closeLimitModal={closeLimitModal} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookContext;

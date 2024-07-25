import React, { useState, useEffect } from "react";
import { MdOpenInNew } from "react-icons/md";
import { LuPackageCheck, LuUsers } from "react-icons/lu";
import { TbTruckLoading } from "react-icons/tb";
import { GoReport } from "react-icons/go";
import { PiClockCountdownLight } from "react-icons/pi";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet"; // Import Leaflet library if 'L' is from Leaflet
import Axios from "axios";
import { Link } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";
function AdminDashboardContext() {
  // Function to retrieve the logged-in user from session storage
  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };

  // Get the logged-in user
  const loggedInUser = getLoggedInUser();
  const [pendingCount, setPendingCount] = useState(0);
  const [CompletedCount, setCompletedCount] = useState(0);
  const [AvailableDriversCount, setAvailableDriversCount] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [ComplaintCount, setComplaintCount] = useState(0);
  const [inTransitBookings, setInTransitBookings] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const colors = ["teal", "blue", "green", "orange", "brown"]; // Define an array of colors

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
      const { lat, lon, display_name } = data[0];
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        name: display_name,
      };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      // Optionally, you can handle the error here, such as displaying a message to the user
      return null; // Return null to indicate that coordinates couldn't be fetched
    }
  };

  useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/bookings/countPendingBookings"
        );
        const data = response.data;
        // Update the state with the fetched count
        setPendingCount(data.pendingCount);
      } catch (error) {
        console.error("Error fetching pending bookings count:", error);
      }
    };

    fetchBookingCount();
  }, []);

  useEffect(() => {
    const fetchCompletedBookingsCount = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/bookings/countCompletedBookings"
        );
        const data = response.data;
        // Update the state with the fetched count
        setCompletedCount(data.CompletedCount);
      } catch (error) {
        console.error("Error fetching complete bookings count:", error);
      }
    };

    fetchCompletedBookingsCount();
  }, []);

  useEffect(() => {
    const fetchAvailableDriversCount = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/drivers/countAvailableDrivers"
        );
        const data = response.data;
        // Update the state with the fetched count
        setAvailableDriversCount(data.AvailableDriversCount);
      } catch (error) {
        console.error("Error fetching available drivers count:", error);
      }
    };

    fetchAvailableDriversCount();
  }, []);

  useEffect(() => {
    const fetchComplaintsCount = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/complaints/countComplaints"
        );
        const data = response.data;
        // Update the state with the fetched count
        setComplaintCount(data.ComplaintCount);
      } catch (error) {
        console.error("Error fetching available drivers count:", error);
      }
    };

    fetchComplaintsCount();
  }, []);

  useEffect(() => {
    const fetchWeeklyRevenue = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/bookings/weekly-revenue"
        );
        setWeeklyRevenue(response.data);
      } catch (error) {
        console.error("Error fetching in weekly revenue:", error);
      }
    };

    fetchWeeklyRevenue();
  }, []);

  const formatDate = (weekNumber, year) => {
    const startDate = getWeekStartDate(weekNumber, year);
    const endDate = getWeekEndDate(weekNumber, year);
    return `${startDate} to ${endDate}`;
  };

  const getWeekStartDate = (weekNumber, year) => {
    const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const dayOfWeek = startDate.getDay();
    const weekStartDate = startDate;
    if (dayOfWeek <= 4) {
      weekStartDate.setDate(startDate.getDate() - dayOfWeek + 1);
    } else {
      weekStartDate.setDate(startDate.getDate() + 8 - dayOfWeek);
    }
    return weekStartDate.toLocaleDateString("en-US");
  };

  const getWeekEndDate = (weekNumber, year) => {
    const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return endDate.toLocaleDateString("en-US");
  };

  useEffect(() => {
    const fetchInTransitBookings = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/bookings/inTransit"
        );
        setInTransitBookings(response.data);
      } catch (error) {
        console.error("Error fetching in transit bookings:", error);
      }
    };

    fetchInTransitBookings();
  }, []);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routesData = await Promise.all(
          inTransitBookings.map(async (booking) => {
            const originCoordinates = await getCoordinates(
              booking.ParcelOrigin
            );
            const destinationCoordinates = await getCoordinates(
              booking.ParcelDestination
            );
            if (originCoordinates && destinationCoordinates) {
              const response = await Axios.get(
                `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624826fdf647f2f548a1a6f0b3336416a6ef&start=${originCoordinates.longitude},${originCoordinates.latitude}&end=${destinationCoordinates.longitude},${destinationCoordinates.latitude}`
              );
              const { features } = response.data;
              if (features && features.length > 0) {
                const routeGeometry = features[0].geometry.coordinates;
                return {
                  origin: originCoordinates,
                  destination: destinationCoordinates,
                  geometry: routeGeometry,
                };
              } else {
                return null;
              }
            } else {
              return null;
            }
          })
        );
        // Filter out null values
        setRoutes(routesData.filter((route) => route !== null));
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [inTransitBookings]);

  useEffect(() => {
    // Concatenate route coordinates
    const allRouteCoordinates = routes.reduce(
      (accumulator, current) => accumulator.concat(current),
      []
    );
    setRouteCoordinates(allRouteCoordinates);
  }, [routes]);

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

  return (
    <div>
      <div className="p-4 sm:ml-14 md:ml-64 font-Montserrat">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-8">
          <div className="flex items-center justify-between h-40 mb-4 mt-5 rounded-xl bg-teal-500 dark:bg-gray-800 relative">
            <div className="flex flex-col justify-center ml-4">
              <p className="text-4xl text-gray-100 dark:text-gray-300">
                Welcome Back,{" "}
                <strong>
                  {loggedInUser &&
                    loggedInUser.EmailAddress.split("@")[0]
                      .toLowerCase() // Convert to lowercase
                      .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
                      .replace(/(\b\w)/g, (char) => char.toUpperCase())}{" "}
                </strong>
                👋
              </p>
              <p className="text-lg text-gray-100 dark:text-gray-300 mt-2">
                Here's what's happening with the hub today.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
            <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <h2 className="mb-2 text-lg sm:text-xl md:text-xl lg:text-xl text-gray-700 dark:text-white">
                  Parcels Delivered
                </h2>
                <p className="mb-3 text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-bold">
                  {CompletedCount}
                </p>
                <a
                  href="/admin/manage-bookings/"
                  className="inline-flex font-medium items-center text-teal-600 hover:underline"
                >
                  View Delivered Parcels&nbsp; <MdOpenInNew />
                </a>
              </div>
              <LuPackageCheck className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-12 lg:h-12 m-5" />
            </div>
            <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <h2 className="mb-2 text-lg sm:text-xl md:text-xl lg:text-xl text-gray-700 dark:text-white">
                  Pending Deliveries
                </h2>
                <p className="mb-3 text-5xl font-bold"> {pendingCount}</p>
                <Link to="/admin/manage-bookings">
                  <p className="inline-flex font-medium items-center text-teal-600 hover:underline">
                    View Pending Bookings&nbsp;
                    <MdOpenInNew />
                  </p>
                </Link>
              </div>
              <TbTruckLoading className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-12 lg:h-12 m-5" />
            </div>
            <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <h2 className="mb-2 text-lg sm:text-xl md:text-xl lg:text-xl text-gray-700 dark:text-white">
                  Available Drivers
                </h2>
                <p className="mb-3 text-5xl font-bold">
                  {AvailableDriversCount}
                </p>
                <a
                  href="/admin/manage-drivers"
                  className="inline-flex font-medium items-center text-teal-600 hover:underline"
                >
                  View Available Drivers&nbsp;
                  <MdOpenInNew />
                </a>
              </div>
              <LuUsers className="absolute top-0 right-0 m-5 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-12 lg:h-12" />
            </div>
            <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="mb-2 text-lg sm:text-xl md:text-xl lg:text-xl text-gray-700 dark:text-white">
                  Total Complaints
                </h2>
                <p className="mb-3 text-5xl font-bold">{ComplaintCount}</p>
                <a
                  href="/admin/manage-complaints"
                  className="inline-flex font-medium items-center text-teal-600 hover:underline"
                >
                  View Complaints&nbsp;
                  <MdOpenInNew />
                </a>
              </div>
              <GoReport className="absolute top-0 right-0 m-5 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-12 lg:h-12" />
            </div>
            <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-lg sm:text-xl md:text-xl lg:text-xl text-gray-700 dark:text-white">
                  Weekly Revenue
                </h2>
                {weeklyRevenue.length > 0 ? (
                  <>
                    <p className="mb-1 text-xs font-semibold text-gray-600">
                      {formatDate(
                        weeklyRevenue[0].WeekNumber,
                        weeklyRevenue[0].Year
                      )}
                    </p>
                    <p className="mb-2 text-5xl font-bold  dark:text-white">
                      ₱ {weeklyRevenue[0].WeeklyRevenue}
                    </p>
                  </>
                ) : (
                  <p className="mb-2 text-lg text-gray-700 dark:text-white">
                    Loading...
                  </p>
                )}
                <a
                  href="/admin/analytics"
                  className="inline-flex font-medium items-center text-teal-600 hover:underline"
                >
                  View Reports & Analytics&nbsp;
                  <MdOpenInNew />
                </a>
              </div>
              <GiReceiveMoney className="absolute top-0 right-0 m-5 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-12 lg:h-12" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 overflow-hidden">
            <div className="flex items-center justify-center rounded bg-gray-50 h-[450px] dark:bg-gray-800">
              <div className="relative z-0 w-full mt-3 rounded-2xl group">
                <MapContainer
                  center={[14.5995, 120.9842]}
                  zoom={10}
                  style={{
                    height: "450px", // Set a fixed height
                    width: "100%", // Set full width
                    borderRadius: "10px",
                  }}
                >
                  {/* Tile Layer */}
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  {/* Render routes */}
                  {routes.map((route, index) => (
                    <React.Fragment key={index}>
                      {/* Polyline for route */}
                      <Polyline
                        positions={route.geometry.map((coord) => [
                          coord[1],
                          coord[0],
                        ])}
                        color={colors[index % colors.length]} // Assign color based on index
                      />

                      {/* Markers for origin and destination */}
                      <Marker
                        position={[
                          route.origin.latitude,
                          route.origin.longitude,
                        ]}
                        icon={pickupIcon}
                      >
                        <Popup>
                          {route.origin.name ? route.origin.name : "Loading..."}
                        </Popup>
                      </Marker>

                      <Marker
                        position={[
                          route.destination.latitude,
                          route.destination.longitude,
                        ]}
                        icon={destinationIcon}
                      >
                        <Popup>
                          {route.destination.name
                            ? route.destination.name
                            : "Loading..."}
                        </Popup>
                      </Marker>
                    </React.Fragment>
                  ))}
                </MapContainer>
              </div>
            </div>

            <div className="items-center justify-center dark:bg-gray-800 p-5 h-[450px] bg-white border border-gray-200 rounded-lg shadow ">
              <h1 className="text-2xl font-semibold mb-4">
                In-Transit Bookings
              </h1>
              <div className="overflow-auto">
                <table className="max-w-full divide-y divide-gray-200 text-xs border border-gray-100 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-auto py-3">
                        Tracking Number
                      </th>
                      <th scope="col" className="px-auto py-3">
                        Pick Up Location
                      </th>
                      <th scope="col" className="px-auto py-3">
                        Drop Off Location
                      </th>
                      <th scope="col" className="px-auto py-3">
                        Assigned Driver
                      </th>
                      <th scope="col" className="px-auto py-3">
                        Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inTransitBookings.map((booking, index) => {
                      // Create an array containing parcelOrigin and parcelDestination for each row
                      const rowData = [
                        `Row ${index + 1} ParcelOrigin: ${
                          booking.ParcelOrigin
                        }`,
                        `Row ${index + 1} ParcelDestination: ${
                          booking.ParcelDestination
                        }`,
                      ];

                      // Log the rowData array
                      console.log(rowData);

                      return (
                        <tr key={booking.BookingID}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.TrackingNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.ParcelOrigin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.ParcelDestination}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.AssignedDriver}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ₱{booking.TotalPrice}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-4 gap-4 mb-4 overflow-hidden">
            <div className="items-center justify-center rounded bg-gray-200 dark:bg-gray-800 p-5 h-[400px]"></div>
            <div className="items-center justify-center rounded bg-gray-200 dark:bg-gray-800 p-5 h-[400px]"></div>
            <div className="col-span-2 items-center justify-center rounded bg-gray-200 dark:bg-gray-800 p-5 h-[400px]"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardContext;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaEye, FaArchive, FaTrashRestore } from "react-icons/fa";
import { MdRestorePage } from "react-icons/md";
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
import ViewBookingInfoModal from "../../components/form/ViewBookingInfo";
import ArchiveBookingModal from "../../components/form/ArchiveBooking";
import EmptyTable from "../../components/ui/EmptyTable";

function AdminBookingMngmntContext() {
  const [bookings, setBooking] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isViewModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedParcelOrigin, setSelectedParcelOrigin] = useState("");
  const [selectedParcelDestination, setSelectedParcelDestination] =
    useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/bookings/getBookings"
        );
        console.log(response.data);
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const handleVehicleTypeChange = (e) => {
    setVehicleTypeFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const filteredBookings = bookings.filter((booking) => {
    // Filter by Account Type
    if (statusFilter && booking.BookingStatus !== statusFilter) {
      return false;
    }

    if (vehicleTypeFilter && booking.VehicleType !== vehicleTypeFilter) {
      return false;
    }

    if (
      searchQuery &&
      !(
        booking.BookingID.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        booking.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.TrackingNumber.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        booking.ParcelOrigin.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        booking.ParcelDestination.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        booking.VehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.AssignedDriver?.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        booking.BookingStatus.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        booking.BookingDate.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (rowData) => {
    setSelectedRow(rowData); // Set the selected row
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null); // Reset selected row
  };

 const openArchiveModal = (booking) => {
    setSelectedRow(booking);
    setIsArchiveModalOpen(true);
  };

  const closeArchiveModal = async () => {
    setIsArchiveModalOpen(false); // Close the Archive modal
    setSelectedRow(null);
  };

  const archiveBooking = async (bookingID) => {
    try {
      console.log("Archiving booking with ID:", bookingID);

      //REPLACE THISSSSSSSS
       const response = await Axios.post(
        "http://localhost:3001/bookings/archiveBookingData",
        { bookingID: bookingID } // Corrected: Pass the bookingID directly
      );
      console.log("Booking archived successfully:", response.data);
      closeArchiveModal();
      // Optionally, you can update the state or perform any other actions after archiving the booking
    } catch (error) {
      console.error("Error archiving booking:", error);
      // Handle error if needed
    }
  };


  const handleArchiveBooking = async (bookingID) => {
    try {
      await archiveBooking(bookingID); // Call archiveBooking function passing bookingID
    } catch (error) {
      console.error("Error handling archive booking:", error.response ? error.response.data : error.message);
      // Handle error if needed
    }
  };


  const [parcelOrigin, setParcelOrigin] = useState("");
  const [parcelDestination, setParcelDestination] = useState("");

  const [pickupCoordinates, setPickupCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleRowClick = (rowData) => {
    // Log the entire rowData object
    console.log("Clicked row data:", rowData);

    // Extract parcel origin and destination from rowData
    const { ParcelOrigin, ParcelDestination } = rowData;
    // Update state variables with selected parcel origin and destination
    setSelectedParcelOrigin(ParcelOrigin);
    setSelectedParcelDestination(ParcelDestination);

    // Log the coordinates
    console.log("Pickup Location:", ParcelOrigin);
    console.log("Destination:", ParcelDestination);

    // Optionally, you can update the state variables to trigger a re-render
    setParcelOrigin(ParcelOrigin);
    setParcelDestination(ParcelDestination);
  };

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
        // Optionally, you can handle the error here, such as displaying a message to the user
        return null; // Return null to indicate that coordinates couldn't be fetched
      }
    };

    const fetchCoordinates = async () => {
      const originCoordinates = await getCoordinates(parcelOrigin);
      const destinationCoordinates = await getCoordinates(parcelDestination);
      console.log("Origin Coordinates:", originCoordinates); // Add this log
      console.log("Destination Coordinates:", destinationCoordinates); // Add this log
      if (originCoordinates && destinationCoordinates) {
        setPickupCoordinates(originCoordinates);
        setDestinationCoordinates(destinationCoordinates);
      }
    };

    fetchCoordinates();
  }, [parcelOrigin, parcelDestination]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "yellow";
      case "For Pickup":
        return "orange";
      case "In Transit":
        return "blue";
      case "Delivered":
        return "green";
      case "Completed":
        return "teal";
      case "Cancelled":
        return "gray";
      default:
        return "gray"; // Default color if status doesn't match any case
    }
  };

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
        console.log("Fetched route data:", response.data); // Add this log
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

  return (
    <div>
      <div className="p-4 sm:ml-64 font-Montserrat">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-8">
          <h1 className="text-left text-2xl my-2 font-semibold">Bookings</h1>
          <div className="relative z-0 w-full mt-3 rounded-2xl group">
            <MapContainer
              center={[14.5995, 120.9842]}
              zoom={10}
              style={{
                height: "400px",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              {/* Tile Layer */}
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* Pickup Marker */}
              {selectedParcelOrigin && (
                <Marker
                  position={[
                    pickupCoordinates.latitude,
                    pickupCoordinates.longitude,
                  ]}
                  icon={pickupIcon}
                >
                  <Popup>Pickup Location: {selectedParcelOrigin}</Popup>
                </Marker>
              )}

              {/* Drop-off Marker */}
              {selectedParcelDestination && (
                <Marker
                  position={[
                    destinationCoordinates.latitude,
                    destinationCoordinates.longitude,
                  ]}
                  icon={destinationIcon}
                >
                  <Popup>Drop-off Location: {selectedParcelDestination}</Popup>
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
          <div className="font-Montserrat mx-auto over bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 p-5">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div>
                <select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="mr-2 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <option value="">Status</option>
                  <option value="Pending">Pending</option>
                  <option value="For Pickup">For Pickup</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={vehicleTypeFilter}
                  onChange={handleVehicleTypeChange}
                  className="mr-2 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <option value="">Vehicle Type</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="200kg Sedan">200kg Sedan</option>
                  <option value="600kg MPV">600kg MPV</option>
                  <option value="1000kg Small Truck">1000kg Small Truck</option>
                  <option value="2000kg Medium Truck">
                    2000kg Medium Truck
                  </option>
                  <option value="3000kg Large Truck">300kg Large Truck</option>
                </select>
              </div>

              <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by Booking Info"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                  />
                </div>
              </div>
            </div>
            <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  md:table-fixed">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-2 py-3">
                    Booking ID
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Tracking Number
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Name
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Date Booked
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Pick Up Location{" "}
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Destination
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Vehicle Type
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Assigned Driver
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Status
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentItems.length > 0 ? (
                  currentItems.map((booking) => (
                    <tr
                      key={booking.BookingID}
                      onClick={() => handleRowClick(booking)}
                      style={{ cursor: "pointer" }}
                    >
                      <th
                        scope="row"
                        class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {booking.BookingID}
                      </th>
                      <td class="px-auto py-4 font-semibold">
                        {booking.TrackingNumber}
                      </td>
                      <td class="px-auto py-4">{booking.Name}</td>
                      <td className="px-auto py-4">
                        {new Date(booking.BookingDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "numeric",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td class="px-auto py-4">{booking.ParcelOrigin}</td>
                      <td class="px-auto py-4">{booking.ParcelDestination}</td>
                      <td class="px-auto py-4">{booking.VehicleType}</td>
                      <td class="px-auto py-4">
                        {booking.AssignedDriver ? (
                          <span className="flex items-center text-gray-500">
                            {booking.AssignedDriver}
                          </span>
                        ) : (
                          <span className="flex items-center text-gray-500">
                            Awaiting Driver
                          </span>
                        )}
                      </td>

                      <td class="px-auto py-4">
                        <span
                          className={`bg-${getStatusColor(
                            booking.BookingStatus
                          )}-100 text-${getStatusColor(
                            booking.BookingStatus
                          )}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${getStatusColor(
                            booking.BookingStatus
                          )}-900 dark:text-${getStatusColor(
                            booking.BookingStatus
                          )}-300`}
                        >
                          {booking.BookingStatus}
                        </span>
                      </td>
                      <td class="px-auto py-4 ">
                        <button
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => openModal(booking)}
                        >
                          <FaEye />
                        </button>
                        <button
                          type="button"
                          class="focus:outline-none text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => openArchiveModal(booking)}
                        >
                          <FaArchive />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">
                      <EmptyTable />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {isViewModalOpen && selectedRow && (
              <ViewBookingInfoModal
                selectedRow={selectedRow}
                onClose={closeModal}
              />
            )}
            {isArchiveModalOpen && selectedRow && (
        <ArchiveBookingModal
          onArchive={() => handleArchiveBooking(selectedRow.BookingID)}
          isOpen={isArchiveModalOpen}
          onClose={closeArchiveModal}
        />
      )}
          </div>
          {/* Pagination */}
          <div className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredBookings.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredBookings.length}
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {[
                ...Array(Math.ceil(filteredBookings.length / itemsPerPage)),
              ].map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === index + 1 ? "font-semibold" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredBookings.length / itemsPerPage)
                  }
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBookingMngmntContext;

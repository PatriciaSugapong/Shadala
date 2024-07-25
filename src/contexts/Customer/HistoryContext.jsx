import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLoggedInUser } from "../../utils/userUtils"; // Import the function
import ImageModal from "../../components/ui/ImageModal";
import EmptyTable from "../../components/ui/EmptyTable";
import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ViewBookingModal from "../../pages/Customer/ViewBookingModal";
import CancelBookingModal from "../../pages/Customer/CancelBookingModal";
import { TbPhotoCheck } from "react-icons/tb";
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

const HistoryContext = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openViewModal = (booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const openCancelModal = (bookingID) => {
    setSelectedBookingId(bookingID); // Set the selected booking ID
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const loggedInUser = getLoggedInUser(); // Get the logged-in user
  let userID = null; // Define userID variable here

  if (loggedInUser) {
    userID = loggedInUser.UserID; // Assign userID if user is logged in
    console.log("Retrieved userID:", userID);
  } else {
    console.log("User not logged in or session data missing.");
  }

  const [bookingHistory, setBookingHistory] = useState([]);
  const [statusFilter, setStatusFilterChange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch booking history data from backend when component mounts
    const fetchBookingHistory = async () => {
      try {
        // Pass userID as a query parameter to the backend endpoint
        const response = await axios.get(
          `http://localhost:3001/bookings/bookingDetails?userID=${userID}`
        );
        setBookingHistory(response.data);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    // Only fetch booking history if userID is available
    if (userID) {
      fetchBookingHistory();
    }
  }, [userID]); // Fetch booking history whenever userID changes

  const handleCancelBooking = async () => {
    try {
      // Send a request to cancel the booking using the selected booking ID
      await axios.put(`http://localhost:3001/bookings/cancelBooking`, {
        bookingID: selectedBookingId, // Pass the bookingID
      });
      // If cancellation is successful, close the modal and refetch booking history
      closeCancelModal();
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilterChange(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const sortedBooking = bookingHistory.sort((a, b) => {
    const statusOrder = {
      Pending: 1,
      "In Transit": 2,
      Delivered: 3,
      Completed: 4,
      Cancelled: 5,
    };
    return statusOrder[a.Status] - statusOrder[b.Status];
  });

  const filteredBooking = sortedBooking.filter((booking) => {
    if (statusFilter && booking.BookingStatus !== statusFilter) {
      return false;
    }

    // Check if the searchQuery matches any of the booking details
    if (
      searchQuery &&
      !(
        booking.BookingID.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        booking.ParcelOrigin.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        booking.ParcelDestination.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        booking.TrackingNumber.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        booking.AssignedDriver?.toLowerCase().includes(
          searchQuery.toLowerCase()
        )
      )
    ) {
      return false; // If no match found, exclude the booking
    }
    return true; // Include the booking if it matches any of the search criteria
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooking.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="font-Montserrat mx-auto over bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 p-5">
      <h1 className="text-left my-2 font-semibold">History</h1>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by Booking Info"
              onChange={handleSearchQueryChange}
            />
          </div>
        </div>
        <table className="table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  md:table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tracking Number
              </th>
              <th scope="col" className="px-6 py-3">
                Date Booked
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Pick-Up Location
              </th>
              <th scope="col" className="px-6 py-3">
                Drop-Off Location
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned Driver
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((booking) => (
                <tr
                  key={booking.BookingID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-16">
                    {booking.TrackingNumber}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(booking.DateBooked).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span
                        className={`bg-${getStatusColor(
                          booking.BookingStatus
                        )}-100 text-${getStatusColor(
                          booking.BookingStatus
                        )}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${getStatusColor(
                          booking.BookingStatus
                        )}-900 dark:text-${getStatusColor(booking.Status)}-300`}
                      >
                        {booking.BookingStatus}
                      </span>
                      {booking.BookingStatus === "Completed" && (
                        <TbPhotoCheck
                          className="w-5 h-auto object-cover rounded-lg cursor-pointer text-teal-600"
                          onClick={() =>
                            openModal(
                              `http://localhost:3001/uploads/${booking.ProofOfDelivery}`
                            )
                          }
                        />
                      )}
                      {isModalOpen && (
                        <ImageModal
                          imageSrc={selectedImage}
                          closeModal={closeModal}
                        />
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">{booking.ParcelOrigin}</td>
                  <td className="px-6 py-4">{booking.ParcelDestination}</td>
                  <td className="px-6 py-4">
                    {booking.AssignedDriver
                      ? booking.AssignedDriver
                      : "No Driver Assigned"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => openViewModal(booking)}
                    >
                      <FaEye />
                    </button>
                    {booking.BookingStatus !== "Pending" ? (
                      <button
                        className="text-white bg-gray-400 cursor-not-allowed opacity-50 font-medium rounded-lg text-sm px-4 py-2 me-1 mb-1 dark:bg-gray-600 dark:opacity-50 dark:cursor-not-allowed dark:text-gray-700 focus:outline-none dark:focus:ring-gray-800"
                        disabled
                      >
                        <MdCancel />
                      </button>
                    ) : (
                      <button
                        onClick={() => openCancelModal(booking.BookingID)}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 me-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                      >
                        <MdCancel />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <EmptyTable />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredBooking.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredBooking.length}
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
            {[...Array(Math.ceil(filteredBooking.length / itemsPerPage))].map(
              (_, index) => (
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
              )
            )}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredBooking.length / itemsPerPage)
                }
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
      {isViewModalOpen && (
        <ViewBookingModal
          booking={selectedBooking}
          closeViewModal={closeViewModal}
        />
      )}
      {isCancelModalOpen && (
        <CancelBookingModal
          bookingID={selectedBookingId}
          closeCancelModal={closeCancelModal}
          handleCancelBooking={handleCancelBooking}
        />
      )}
    </div>
  );
};

export default HistoryContext;

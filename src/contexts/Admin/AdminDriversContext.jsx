import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaEye, FaArchive, FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdEdit, MdAssignmentAdd } from "react-icons/md";
import ViewDriverInfoModal from "../../components/form/ViewDriverInfo";
import EditDriverInfo from "../../components/form/EditDriverInfo";
import ArchiveDriverModal from "../../components/form/ArchiveDriver";
import { MdRestorePage } from "react-icons/md";
import SuccessToast from "../../components/ui/SuccessToast";
import EmptyTable from "../../components/ui/EmptyTable";

function AdminDriversContext() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Function to show the success toast
  const showSuccess = () => {
    setShowSuccessToast(true);
    // You can also set a timer to hide the toast after a certain duration
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000); // Hide toast after 3 seconds (adjust as needed)
  };

  function getStatusBadge(currentStatus) {
    switch (currentStatus) {
      case "Newly Registered":
        return "bg-teal-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-teal-400";
      case "Available":
        return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400";
      case "Occupied":
        return "bg-orange-100 text-orange-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-orange-400";
      case "Not Available":
        return "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-red-400";
      default:
        return "";
    }
  }
  const handleUpdate = (updatedData) => {
    // Logic to update the state with the updated data
    // For example:
    setSelectedRow(updatedData);
  };
  const [drivers, setDrivers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchDrivers = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/drivers");
      console.log(response.data);
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchDrivers(); // Call fetchDrivers inside useEffect
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

  // Function to handle row selection
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };

  const filteredDrivers = drivers.filter((drivers) => {
    // Filter by Account Type
    if (statusFilter && drivers.CurrentStatus !== statusFilter) {
      return false;
    }

    if (vehicleTypeFilter && drivers.VehicleType !== vehicleTypeFilter) {
      return false;
    }

    if (
      searchQuery &&
      !(
        drivers.DriverID.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        drivers.DriverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drivers.VehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drivers.PlateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drivers.LicenseNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (rowData) => {
    setSelectedRow(rowData); // Set the selected row
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null); // Reset selected row
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const openArchiveModal = (rowData) => {
    setSelectedRow(rowData); // Set the selected row
    setIsArchiveModalOpen(true); // Open the Archive modal
  };

  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false);
    setSelectedRow(null); // Reset selected row
  };
  const archiveDriver = async (driverID) => {
    try {
      console.log("Archiving driver with ID:", driverID);
      // Make an HTTP request to your backend API endpoint
      const response = await Axios.post(
        "http://localhost:3001/drivers/archiveDriverData",
        { driverID: driverID } // Corrected: Pass the bookingID directly
      );
      console.log("Driver archived successfully:", response.data);
      closeArchiveModal();
      // Optionally, you can update the state or perform any other actions after archiving the booking
    } catch (error) {
      console.error("Error archiving driver:", error);
      // Handle error if needed
    }
  };

  const handleArchiveDriver = async (driverID) => {
    try {
      await archiveDriver(driverID); // Call archiveDriver function passing driverID
      setShowSuccessToast(true); // Show success toast after archiving successfully
      fetchDrivers(); // Fetch updated driver data after archiving
    } catch (error) {
      console.error("Error archiving driver:", error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <div className="p-4 sm:ml-64 font-Montserrat">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-8 relative">
          <div className="sticky top-[80px]">
            <h1 className="text-left text-2xl my-2 font-semibold">Drivers</h1>

            <div className="flex items-center justify-center h-40 mb-4 mt-5 rounded-xl bg-teal-500 dark:bg-gray-800 ">
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-center justify-center space-x-4">
                  {selectedRow && selectedRow.ValidLicenseImg ? (
                    <img
                      src={`http://localhost:3001/uploads/${selectedRow.ValidLicenseImg}`}
                      className="max-w-full h-[135px] rounded-lg"
                      alt="Valid License"
                    />
                  ) : (
                    <FaUserCircle
                      size={100}
                      className="text-gray-100 dark:text-gray-300 mr-4"
                    />
                  )}

                  <div className="flex flex-col justify-center">
                    <p className="text-4xl text-gray-100 dark:text-gray-300 font-semibold">
                      {selectedRow ? selectedRow.DriverName : "Select a Driver"}
                    </p>
                    <p className="text-lg text-gray-100 dark:text-gray-300 mt-2">
                      {selectedRow ? selectedRow.HomeAddress : ""}
                    </p>
                    <p className="text-lg text-gray-100 dark:text-gray-300 mt-1">
                      Current Status:{" "}
                      <strong>
                        {" "}
                        {selectedRow ? selectedRow.CurrentStatus : ""}
                      </strong>
                    </p>
                  </div>
                  <div className="flex flex-col justify-center ml-4">
                    <p className="text-lg text-gray-100 dark:text-gray-300">
                      Vehicle Type:{" "}
                      <strong>
                        {selectedRow ? selectedRow.VehicleType : ""}
                      </strong>
                    </p>
                    <p className="text-lg text-gray-100 dark:text-gray-300 mt-1">
                      License Number:{" "}
                      <strong>
                        {selectedRow ? selectedRow.LicenseNumber : ""}
                      </strong>
                    </p>
                    <p className="text-lg text-gray-100 dark:text-gray-300 mt-1">
                      Plate Number:{" "}
                      <strong>
                        {selectedRow ? selectedRow.PlateNumber : ""}
                      </strong>
                    </p>
                  </div>
                  <div className="flex flex-col justify-center ml-4">
                    <p className="text-lg text-gray-100 dark:text-gray-300">
                      Vehicle Model:{" "}
                      <strong>
                        {selectedRow ? selectedRow.VehicleModel : ""}
                      </strong>
                    </p>
                    {/* <p className="text-lg text-gray-100 dark:text-gray-300">
                      Last Delivery:{" "}
                      <strong>
                        {selectedRow ? selectedRow.VehicleModel : ""}
                      </strong>
                    </p> */}
                    <button
                      className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mt-4 rounded-lg"
                      onClick={() => openModal(selectedRow)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="font-Montserrat mx-auto over bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 p-5 sticky top-[1000x]">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div>
                <select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="mr-2 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <option value="">Status</option>
                  <option value="Newly Registered">Newly Registered</option>
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Unavailable">Unavailable</option>
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
                    placeholder="Search by Driver Info"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto sm:rounded-lg">
              <div className="max-h-[450px] overflow-y-auto">
                {isModalOpen && selectedRow && (
                  <ViewDriverInfoModal
                    selectedRow={selectedRow}
                    onClose={closeModal}
                  />
                )}
                {isEditModalOpen && (
                  <EditDriverInfo
                    selectedRow={selectedRow}
                    onClose={closeEditModal}
                    onUpdate={handleUpdate}
                    fetchDrivers={fetchDrivers} // Pass the fetchDrivers function as a prop
                    showSuccess={showSuccess}
                  />
                )}
                {isArchiveModalOpen && (
                  <ArchiveDriverModal
                    onArchive={() => handleArchiveDriver(selectedRow.DriverID)}
                    isOpen={isArchiveModalOpen}
                    onClose={closeArchiveModal}
                  />
                )}
                {showSuccessToast && (
                  <SuccessToast message="Edit successful!" />
                )}

                <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Driver ID
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Vehicle Type
                      </th>
                      <th scope="col" class="px-6 py-3">
                        License Number
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Plate Number
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentItems.length > 0 ? (
                      currentItems.map((drivers) => (
                        <tr
                          key={drivers.DriverID}
                          onClick={() => handleRowClick(drivers)}
                        >
                          <td className="px-6 py-4  ">{drivers.DriverID}</td>
                          <td className="px-6 py-4  ">
                            <span
                              className={getStatusBadge(drivers.CurrentStatus)}
                            >
                              <span className="ml-1">
                                {drivers.CurrentStatus}
                              </span>
                            </span>
                          </td>
                          <td className="px-6 py-4">{drivers.DriverName}</td>
                          <td className="px-6 py-4">{drivers.VehicleType}</td>
                          <td className="px-6 py-4">{drivers.LicenseNumber}</td>
                          <td className="px-6 py-4">{drivers.PlateNumber}</td>

                          <td className="px-6 py-2">
                            <button
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              onClick={() => openModal(drivers)}
                            >
                              <FaEye />
                            </button>

                            <button
                              type="button"
                              className="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:yellow-300 font-medium rounded-lg text-sm px-4 py-2 me-1 mb-1 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                              onClick={() => {
                                openEditModal(); // Call the openEditModal function
                                handleRowClick(drivers.DriverID);
                              }}
                            >
                              <MdEdit />
                            </button>
                            <button
                              type="button"
                              class="focus:outline-none text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              onClick={() => {
                                openArchiveModal(drivers.DriverID);
                              }}
                            >
                              <FaArchive />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">
                          <EmptyTable />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredDrivers.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredDrivers.length}
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
                  ...Array(Math.ceil(filteredDrivers.length / itemsPerPage)),
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
                      Math.ceil(filteredDrivers.length / itemsPerPage)
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
    </div>
  );
}

export default AdminDriversContext;

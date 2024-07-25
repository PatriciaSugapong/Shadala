import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaEye, FaArchive } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidCommentDots } from "react-icons/bi";
import ViewComplaintInfoModal from "../../components/form/ViewComplaintInfo";
import ImageModal from "../../components/ui/ImageModal";
import { MdRestorePage } from "react-icons/md";
import ComplaintFeedbackModal from "../../components/form/ComplaintFeedback";
import EmptyTable from "../../components/ui/EmptyTable";
import ArchiveComplaintModal from "../../components/form/ArchiveComplaint";

function AdminComplaintsContext() {
  const [complaint, setComplaint] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [complaintTypeFilter, setComplaintTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);

  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const openArchiveModal = (complaint) => {
    setSelectedRow(complaint);
    setIsArchiveModalOpen(true);
  };

  const closeArchiveModal = async () => {
    setIsArchiveModalOpen(false); // Close the Archive modal
    setSelectedRow(null);
  };

  function getStatusBadge(currentStatus) {
    switch (currentStatus) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-teal-yellow";
      case "In Progress":
        return "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-blue-400";
      case "Resolved":
        return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400";
      case "Closed":
        return "bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-gray-400";
      default:
        return "";
    }
  }

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/complaints/getComplaint"
        );
        console.log(response.data);
        setComplaint(response.data);
      } catch (error) {
        console.error("Error fetching complaint", error);
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const handleComplaintTypeChange = (e) => {
    setComplaintTypeFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openViewModal = (rowData) => {
    setSelectedRow(rowData); // Set the selected row
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedRow(null); // Set the selected row
  };
  const [selectedImage, setSelectedImage] = useState("");

  const [isImageModalOpen, setisImageModalOpen] = useState(false);

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setisImageModalOpen(true);
  };

  const closeImageModal = () => {
    setisImageModalOpen(false);
    setSelectedImage(null); // Reset the selected image
  };

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const openFeedbackModal = (rowData) => {
    console.log(rowData); // Add this line to inspect the rowData before opening the modal
    setSelectedRow(rowData); // Set the selected row
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setSelectedRow(null); // Set the selected row
  };

  const filteredComplaints = complaint.filter((complaint) => {
    // Filter by Account Type
    if (statusFilter && complaint.ComplaintStatus !== statusFilter) {
      return false;
    }

    if (
      complaintTypeFilter &&
      complaint.ComplaintType !== complaintTypeFilter
    ) {
      return false;
    }

    const formattedDate = new Date(complaint.DateFiled).toLocaleDateString(
      "en-US",
      {
        month: "numeric",
        day: "2-digit",
        year: "numeric",
      }
    );
    if (
      searchQuery &&
      !(
        complaint.ComplaintID.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        complaint.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.TrackingNumber.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        formattedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.ComplaintType.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        complaint.Description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredComplaints.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const archiveComplaint = async (complaintID) => {
    try {
      console.log("Archiving complaint with ID:", complaintID);

      const response = await Axios.post(
        "http://localhost:3001/complaints/archive",
        { complaintID: complaintID } // Pass the complaintID directly
      );

      closeArchiveModal();
      // Optionally, you can update the state or perform any other actions after archiving the complaint
    } catch (error) {
      console.error("Error archiving complaint:", error);
      // Handle error if needed
    }
  };

  const handleArchiveComplaint = async (complaintID) => {
    try {
      await archiveComplaint(complaintID); // Pass complaintID to archiveComplaint function
    } catch (error) {
      console.error("Error archiving complaint:", error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <div className="p-4 sm:ml-64 font-Montserrat">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-8">
          <h1 className="text-left text-2xl my-2 font-semibold">Complaints</h1>
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
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
                <select
                  value={complaintTypeFilter}
                  onChange={handleComplaintTypeChange}
                  className="mr-2 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <option value="">Complaint Type</option>
                  <option value="Lost Items">Lost Items</option>
                  <option value="Damaged Items">Damaged Items</option>
                  <option value="Missing or Incomplete Items">
                    Missing or Incomplete Items
                  </option>
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
                    placeholder="Search by Complaint Info"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                  />
                </div>
              </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
              {isImageModalOpen && selectedImage && (
                <ImageModal
                  imageSrc={selectedImage}
                  closeModal={closeImageModal} // Ensure this function is passed
                />
              )}

              {isViewModalOpen && selectedRow && (
                <ViewComplaintInfoModal
                  selectedRow={selectedRow}
                  onClose={closeViewModal}
                />
              )}

              {isFeedbackModalOpen && selectedRow && (
                <ComplaintFeedbackModal
                  selectedRow={selectedRow} // Pass selectedRow here
                  onClose={closeFeedbackModal}
                />
              )}

              {isArchiveModalOpen && selectedRow && (
                <ArchiveComplaintModal
                  onArchive={() =>
                    handleArchiveComplaint(selectedRow.ComplaintID)
                  }
                  isOpen={isArchiveModalOpen}
                  onClose={closeArchiveModal}
                />
              )}

              <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  md:table-fixed">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-2 py-3">
                      Complaint ID
                    </th>
                    <th scope="col" class="px-auto py-3">
                      Status
                    </th>
                    <th scope="col" class="px-auto py-3">
                      Date Filed
                    </th>
                    <th scope="col" class="px-auto py-3">
                      Name
                    </th>
                    <th scope="col" class="px-auto py-3">
                      Complaint Type
                    </th>
                    <th scope="col" class="px-auto py-3">
                      Description
                    </th>
                    <th scope="col" class="px-auto py-3">
                      Attachment
                    </th>
                    <th scope="col" class="px-auto py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((complaint) => (
                      <tr
                        className={`${
                          complaint.RecordStatus === "Archived"
                            ? "bg-gray-200 dark:bg-gray-700"
                            : "bg-white dark:bg-gray-800"
                        } border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                        key={complaint.ComplaintID}
                      >
                        <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {complaint.ComplaintID}
                        </td>
                        <td className="px-auto py-4  ">
                          <span
                            className={getStatusBadge(
                              complaint.ComplaintStatus
                            )}
                          >
                            <span className="ml-1">
                              {complaint.ComplaintStatus}
                            </span>
                          </span>
                        </td>{" "}
                        <td className="px-auto py-4">
                          {new Date(complaint.DateFiled).toLocaleDateString(
                            "en-US",
                            {
                              month: "numeric",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-auto py-4">{complaint.Name}</td>
                        <td className="px-auto py-4">
                          {complaint.ComplaintType}
                        </td>
                        <td className="px-auto py-4">
                          {complaint.Description.length > 50
                            ? complaint.Description.substring(0, 50) + "..."
                            : complaint.Description}
                        </td>
                        <td className="px-auto py-4">
                          <img
                            src={`http://localhost:3001/uploads/${complaint.Attachment}`} // Assuming the server URL is http://localhost:3001
                            alt="Valid License"
                            onClick={() =>
                              openImageModal(
                                `http://localhost:3001/uploads/${complaint.Attachment}`
                              )
                            }
                            style={{ maxWidth: "120px", maxHeight: "60px" }} // Adjust the size as needed
                          />
                        </td>
                        <td className="px-auto py-4 ">
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => openViewModal(complaint)}
                          >
                            <FaEye />
                          </button>
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-green-500 hover:bg-green-900 focus:ring-4 focus:green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                            onClick={() => openFeedbackModal(complaint)} // Call openFeedbackModal function
                          >
                            <BiSolidCommentDots />
                          </button>
                          <button
                            type="button"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => {
                              openArchiveModal(complaint);
                            }}
                          >
                            <FaArchive />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">
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
                    {Math.min(indexOfLastItem, filteredComplaints.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filteredComplaints.length}
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
                    ...Array(
                      Math.ceil(filteredComplaints.length / itemsPerPage)
                    ),
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
                        Math.ceil(filteredComplaints.length / itemsPerPage)
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
    </div>
  );
}

export default AdminComplaintsContext;

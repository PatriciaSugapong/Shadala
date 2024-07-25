import React, { useState, useEffect } from "react";
import Axios from "axios";
import { TbMessageReport } from "react-icons/tb";
import { getLoggedInUser } from "../../utils/userUtils";
import { complaintSchema } from "../../utils/validations/UserValidation";
import { MdError } from "react-icons/md";
import SuccessToast from "../../components/ui/SuccessToast";
import EmptyTable from "../../components/ui/EmptyTable";
import ViewComplaintInfoModal from "../../components/form/ViewComplaintInfo";
import { FaEye, FaArchive } from "react-icons/fa";
import ImageModal from "../../components/ui/ImageModal";
import ComplaintFeedbackModal from "../../components/form/ComplaintFeedback";
import { IoFileTrayStacked } from "react-icons/io5";
export default function ComplaintContext() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [typeOfComplaint, setTypeOfComplaint] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [proofAttachment, setProofAttachment] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [complaint, setComplaint] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [complaintTypeFilter, setComplaintTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = getLoggedInUser();
    let userID = null;

    if (loggedInUser) {
      userID = loggedInUser.UserID;
      console.log("Retrieved userID:", userID);
    } else {
      console.log("User not logged in or session data missing.");
    }

    console.log("Submitting form...");

    let formData = new FormData();

    formData.append("userID", userID);
    formData.append("trackingNumber", trackingNumber);
    formData.append("typeOfComplaint", typeOfComplaint);
    formData.append("complaintDescription", complaintDescription);
    formData.append("proofAttachment", proofAttachment);

    // Debug log to inspect formData
    console.log("Form data before validation:", Object.fromEntries(formData));

    // Extract form data fields excluding file inputs
    const formDataToValidate = {
      trackingNumber: formData.get("trackingNumber"),
      typeOfComplaint: formData.get("typeOfComplaint"),
      complaintDescription: formData.get("complaintDescription"),
    };

    try {
      await complaintSchema.validate(formDataToValidate, { abortEarly: false });
      console.log("Form data validated successfully.");

      const response = await Axios.post(
        "http://localhost:3001/customer/file-complaint",
        formData
      );

      console.log("Form data submitted successfully.");
      console.log("Response:", response.data);

      resetForm();
      setShowSuccessToast(true);
    } catch (error) {
      console.error("Error occurred while submitting form:", error);
      const newErrors = {};

      if (error.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      } else {
        newErrors["general"] = error.message;
      }

      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    console.log("Resetting form...");
    setTrackingNumber("");
    setTypeOfComplaint("");
    setComplaintDescription("");
    setProofAttachment(null);

    // Clear file input fields
    const fileInput = document.querySelectorAll('input[type="file"]');
    fileInput.forEach((input) => {
      input.value = ""; // Reset file input value
    });

    setErrors({});
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
        const loggedInUser = await getLoggedInUser(); // Assuming getLoggedInUser() is an async function
        let userID = null;

        if (loggedInUser) {
          userID = loggedInUser.UserID;
          console.log("Retrieved userID:", userID);

          const response = await Axios.get(
            `http://localhost:3001/complaints/getComplaintsByCustomerID?userID=${userID}`
          );

          console.log(response.data);
          setComplaint(response.data);
        } else {
          console.log("User not logged in or session data missing.");
        }
      } catch (error) {
        console.error("Error fetching complaint", error);
      }
    };

    fetchComplaints();
  }, []);

  const [recordStatusFilter, setRecordStatusFilter] = useState("");

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const handleRecordStatusChange = (e) => {
    setRecordStatusFilter(e.target.value);
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
  };

  // const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  // const openArchiveModal = () => {
  //   setIsArchiveModalOpen(true);
  // };

  // const closeArchiveModal = () => {
  //   setIsArchiveModalOpen(false);
  // };

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

    if (recordStatusFilter && complaint.RecordStatus !== recordStatusFilter) {
      return false;
    }

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
        complaint.ComplaintStatus.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        complaint.Feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.DateFiled.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  return (
    <div>
      <div className="font-Montserrat w-full max-w-[1240px] mx-auto over bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 p-5">
        <div className="flex items-center justify-center">
          <TbMessageReport size={50} className="text-gray-800" />
        </div>
        <h3 className="text-xl font-extrabold text-center text-gray-800 dark:text-gray-200">
          Complaint Form
        </h3>

        <p className="mb-3 text-[12px] text-center text-gray-500 dark:text-gray-400">
          Please fill out the form with your complaint. We will review your
          request and follow up with you as soon as possible.
        </p>

        <form onSubmit={handleComplaintSubmit}>
          <div className="flex flex-col">
            {/* Tracking Number */}
            <div className="flex flex-row items-center mb-4">
              <label
                className="block text-sm font-medium text-gray-800 mr-2 w-40"
                htmlFor="trackingNumber"
              >
                Tracking Number
              </label>
              <input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="p-2 w-full border rounded-md focus:outline-none border-gray-300 focus:border-teal-500"
                required
              />
              {errors.trackingNumber && (
                <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                  <span className="mr-1">
                    <MdError />
                  </span>
                  {errors.trackingNumber}
                </p>
              )}
            </div>
            {/* Type of Complaint */}
            <div className="flex flex-row items-center mb-4">
              <label
                className="block text-sm font-medium text-gray-800 mr-2 w-40"
                htmlFor="complaintType"
              >
                Type of Complaint
              </label>
              <select
                value={typeOfComplaint}
                onChange={(e) => setTypeOfComplaint(e.target.value)}
                className="p-2 w-full border rounded-md focus:outline-none border-gray-300 focus:border-teal-500"
                required
              >
                <option disabled value="">
                  Select Type of Complaint
                </option>
                <option value="Lost Items">Lost Items</option>
                <option value="Damaged Items">Damaged Items</option>
                <option value="Missing or Incomplete Items">
                  Missing or Incomplete Items
                </option>
              </select>
              {errors.typeOfComplaint && (
                <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                  <span className="mr-1">
                    <MdError />
                  </span>
                  {errors.typeOfComplaint}
                </p>
              )}
            </div>
            {/* Complaint Details */}
            <div className="flex flex-row items-center">
              <label
                className="block text-sm font-medium text-gray-800 mr-2 w-40"
                htmlFor="complaintDetails"
              >
                Complaint Details
              </label>
              <textarea
                value={complaintDescription}
                onChange={(e) => setComplaintDescription(e.target.value)}
                id="complaintDetails"
                name="complaintDetails"
                rows="4"
                className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your complaints here..."
              ></textarea>
              {errors.complaintDescription && (
                <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                  <span className="mr-1">
                    <MdError />
                  </span>
                  {errors.complaintDescription}
                </p>
              )}
            </div>
            {/* Proof Attachments */}
            <div className="flex flex-row items-start">
              <div className="flex flex-col flex-grow mr-4">
                <label
                  className="block text-sm font-medium text-gray-800 mt-3 mr-2 w-40"
                  htmlFor="proofAttachment"
                >
                  Proof Attachments
                </label>
                <div className="w-full">
                  <input
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    accept="image/*"
                    id="proofAttachment"
                    name="proofAttachment"
                    onChange={(e) => {
                      setProofAttachment(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1 ">
                    Only if applicable.
                  </p>
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#10969f] hover:bg-[#20848b] transition-colors text-white font-medium rounded-lg mt-8 px-5 py-3"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        {showSuccessToast && <SuccessToast message="Complaint successful!" />}
      </div>
      <div>
        <div className="font-Montserrat mx-auto over bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 p-5">
          <div className="flex flex-row items-center text-gray-700">
            <IoFileTrayStacked />
            <h3 className="ml-2 text-xl font-extrabold  dark:text-gray-200">
              Filed Complaints
            </h3>
          </div>

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
              {/* <select
                value={recordStatusFilter}
                onChange={handleRecordStatusChange}
                className="ml-2 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                <option value="">Record Status</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select> */}
            </div>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg">
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

            {/* {isArchiveModalOpen && (
              <ArchiveComplaintInfoModal
                selectedRow={selectedRow}
                onClose={closeArchiveModal}
              />
            )} */}

            <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  md:table-fixed">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-2 py-3">
                    ID
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Tracking Number
                  </th>

                  <th scope="col" class="px-auto py-3">
                    Status
                  </th>
                  <th scope="col" class="px-auto py-3">
                    Date Filed
                  </th>

                  <th scope="col" class="px-auto py-3">
                    Complaint Type
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
                      <td className="px-2 py-4 font-medium text-gray-900 ">
                        {complaint.ComplaintID}
                      </td>
                      <td className="px-auto py-4">
                        {complaint.TrackingNumber}
                      </td>
                      <td className="px-auto py-4  ">
                        <span
                          className={getStatusBadge(complaint.ComplaintStatus)}
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
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-auto py-4">
                        {complaint.ComplaintType}
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
                        {isImageModalOpen && (
                          <ImageModal
                            imageSrc={`http://localhost:3001/uploads/${complaint.Attachment}`}
                            closeModal={closeImageModal}
                          />
                        )}
                      </td>
                      <td className="px-auto py-4 ">
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => openViewModal(complaint)}
                        >
                          <FaEye />
                        </button>
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
                  ...Array(Math.ceil(filteredComplaints.length / itemsPerPage)),
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
  );
}

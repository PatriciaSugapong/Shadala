import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  FaEye,
  FaArchive,
  FaUser,
  FaUserCog,
  FaCar,
  FaUserPlus,
} from "react-icons/fa";
import AddAdminModal from "./AddAdminModal";
import ViewUserInfoModal from "../../components/form/ViewUserInfo";
import { MdRestorePage } from "react-icons/md";
import ArchiveUserModal from "../../components/form/ArchiveUser";

function getRoleBadge(accountType) {
  switch (accountType) {
    case "Admin":
      return "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-blue-400";
    case "Customer":
      return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400";
    case "Driver":
      return "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-yellow-400";
    default:
      return "";
  }
}

function getRoleIcon(accountType) {
  switch (accountType) {
    case "Admin":
      return <FaUserCog />;
    case "Customer":
      return <FaUser />;
    case "Driver":
      return <FaCar />;
    default:
      return null;
  }
}

function AdminUserContext() {
  const [users, setUsers] = useState([]);
  const [accountTypeFilter, setAccountTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/users");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAccountTypeChange = (e) => {
    setAccountTypeFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const filteredUsers = users.filter((user) => {
    // Filter by Account Type
    if (accountTypeFilter && user.AccountType !== accountTypeFilter) {
      return false;
    }

    // Filter by Search Query
    const firstName =
      user.AccountType === "Admin"
        ? user.adminFirstName || ""
        : user.AccountType === "Customer"
        ? user.customerFirstName || ""
        : user.driverFirstName || "";

    const lastName =
      user.AccountType === "Admin"
        ? user.adminLastName || ""
        : user.AccountType === "Customer"
        ? user.customerLastName || ""
        : user.driverLastName || "";

    if (
      searchQuery &&
      !(
        user.UserID.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.AccountType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.EmailAddress.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = (rowData) => {
    setSelectedRow(rowData); // Set the selected row
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null); // Reset selected row
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openViewModal = (rowData) => {
    setSelectedRow(rowData); // Set the selected row
    setIsViewModalOpen(true); // Open the modal
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedRow(null); // Reset selected row
  };
  
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  
    const openArchiveModal = (user) => {
    setSelectedRow(user);
    setIsArchiveModalOpen(true);
  };

  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false);
    setSelectedRow(null);
  };


  const archiveUser = async (userID) => {
    try {
      console.log("Archiving user with ID:", userID);
      const response = await Axios.post(
        "http://localhost:3001/users/archiveUser",
        { userID: userID }
      );
      console.log("User archived successfully:", response.data);
      closeArchiveModal();
      // Optionally, you can update the state or perform any other actions after archiving the user
    } catch (error) {
      console.error("Error archiving user:", error);
      // Handle error if needed
    }
  };

  const handleArchiveUser = async (userID) => {
    try {
      await archiveUser(userID);
    } catch (error) {
      console.error("Error archiving user:", error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <div>
        <div className="p-4 sm:ml-64 font-Montserrat">
          <div className="p-4 rounded-lg dark:border-gray-700 mt-8">
            <h1 className="text-left text-2xl my-2 font-semibold">
              User Management
            </h1>

            <div className="font-Montserrat mx-auto over bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 p-5">
              <div className="flex flex-row items-center justify-between pb-4">
                <div className="flex justify-center flex-row items-center space-x-2">
                  <div>
                    <select
                      value={accountTypeFilter}
                      onChange={handleAccountTypeChange}
                      className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      <option value="">Account Type</option>
                      <option value="Admin">Admin</option>
                      <option value="Customer">Customer</option>
                      <option value="Driver">Driver</option>
                    </select>
                  </div>

                  <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
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
                        placeholder="Search by User Info"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openModal}
                  className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 focus:outline-none"
                >
                  <div className="flex flex-row items-center">
                    <FaUserPlus className="mr-2" size={15} />
                    Add Admin
                  </div>
                </button>
              </div>

              <div className="relative overflow-x-auto sm:rounded-lg">
                {isModalOpen && <AddAdminModal onClose={closeModal} />}
                {isViewModalOpen && selectedRow && (
                  <ViewUserInfoModal
                    selectedRow={selectedRow}
                    onClose={closeModal}
                  />
                )}
                {isArchiveModalOpen && selectedRow && (
                  <ArchiveUserModal
                    onArchive={() => handleArchiveUser(selectedRow.UserID)}
                    isOpen={isArchiveModalOpen}
                    onClose={closeArchiveModal}
                  />
                )}
                <table className="striped table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 md:table-fixed ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-auto py-3 whitespace-nowrap"
                      >
                        User ID
                      </th>
                      <th
                        scope="col"
                        className="px-auto py-3 whitespace-nowrap">
                        Account Type
                      </th>
                      <th
                        scope="col"
                        className="px-auto py-3 whitespace-nowrap"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="px-auto py-3 whitespace-nowrap"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="px-auto py-3 whitespace-nowrap"
                      >
                        Email Address
                      </th>
                      <th
                        scope="col"
                        className="px-auto py-3 whitespace-nowrap "
                      >
                        Date Joined
                      </th>
                      <th
                        scope="col"
                        className="px-auto py-3 whitespace-nowrap"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((user) => (
                      <tr
                        key={user.UserID}
                      >
                        <td className="px-auto py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-16">
                          {user.UserID}
                        </td>
                        <td className="px-auto py-4 flex items-center whitespace-nowrap">
                          <span className={getRoleBadge(user.AccountType)}>
                            <span className="flex items-center">
                              {getRoleIcon(user.AccountType)}
                              <span className="ml-1">{user.AccountType}</span>
                            </span>
                          </span>
                        </td>

                        <td className="px-auto py-4 whitespace-nowrap">
                          {user.AccountType === "Admin"
                            ? user.AdminFirstName
                            : user.AccountType === "Customer"
                            ? user.CustomerFirstName
                            : user.AccountType === "Driver"
                            ? user.DriverFirstName
                            : ""}
                        </td>

                        <td className="px-auto py-4 whitespace-nowrap">
                          {user.AccountType === "Admin"
                            ? user.AdminLastName
                            : user.AccountType === "Customer"
                            ? user.CustomerLastName
                            : user.AccountType === "Driver"
                            ? user.DriverLastName
                            : ""}
                        </td>

                        <td className="px-auto py-4 whitespace-nowrap">
                          {user.EmailAddress}
                        </td>
                        <td className="px-auto py-4 whitespace-nowrap">
                          {new Date(user.DateCreated).toLocaleString("en-PH")}
                        </td>
                        <td className="px-auto py-4 whitespace-nowrap">
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => openViewModal(user)}
                          >
                            <FaEye />
                          </button>
                          <button
                            type="button"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => openArchiveModal(user)}
                          >
                            <FaArchive />
                          </button>
                        </td>
                     </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {indexOfFirstItem + 1}-
                      {Math.min(indexOfLastItem, filteredUsers.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {filteredUsers.length}
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
                      ...Array(Math.ceil(filteredUsers.length / itemsPerPage)),
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
                          Math.ceil(filteredUsers.length / itemsPerPage)
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
    </div>
  );
}

export default AdminUserContext;
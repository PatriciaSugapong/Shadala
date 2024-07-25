import React, { useState, useEffect } from "react";
import logo from "../../assets/shadala.png";
import {
  MdSpaceDashboard,
  MdDiversity3,
  MdAssignmentLate,
  MdFolderShared,
  MdInsertChart,
  MdExitToApp,
  MdOutlineDehaze,
} from "react-icons/md";
import { BiSolidPackage } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import ConfirmSignoutModal from "../../components/ui/ConfirmSignoutModal";

function AdminSideBar() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingComplaintCount, setPendingComplaintCount] = useState(0); // Initialize with 0 or the default count

  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };

  const loggedInUser = getLoggedInUser();

  const handleSignOut = () => {
    setShowConfirmation(true);
  };

  const confirmSignOut = () => {
    sessionStorage.removeItem("user");
    navigate("/ph-en");
  };

  const cancelSignOut = () => {
    setShowConfirmation(false);
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
    const fetchPendingComplaintCount = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/complaints/countPendingComplaints"
        );
        const data = response.data;
        // Ensure that data.pendingComplaintCount matches the structure of the response
        setPendingComplaintCount(data.pendingComplaintCount);
      } catch (error) {
        console.error("Error fetching pending complaints count:", error);
      }
    };

    fetchPendingComplaintCount();
  }, []);

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <MdOutlineDehaze size={25} />
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <img src={logo} className="h-8 me-3" alt="Shadala Logo" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 lg:w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 font-Montserrat"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-regular">
            <li>
              <Link to="/admin/dashboard">
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
                  <MdSpaceDashboard size={25} />
                  <span className="ms-3 hidden md:inline-block">Dashboard</span>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/admin/manage-bookings">
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <div className="relative">
                    <BiSolidPackage size={25} />
                    {/* The count of pending bookings*/}
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center w-4 h-4 p-1 text-xs font-semibold text-white bg-teal-500 rounded-full ">
                      {pendingCount}
                    </span>
                  </div>
                  <span className="hidden md:inline-block ms-3 whitespace-nowrap">
                    Bookings
                  </span>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/admin/manage-drivers">
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <MdDiversity3 size={25} />
                  <span className="flex-1 ms-3 whitespace-nowrap hidden md:inline-block">
                    Drivers
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-complaints">
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <div className="relative">
                    <MdAssignmentLate size={25} />
                    {/* The count of pending bookings*/}
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center w-4 h-4 p-1 text-xs font-semibold text-white bg-teal-500 rounded-full ">
                      {pendingComplaintCount}
                    </span>
                  </div>
                  <span className="hidden md:inline-block ms-3 whitespace-nowrap">
                    Complaints
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/analytics">
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <MdInsertChart size={25} />
                  <span className="flex-1 ms-3 whitespace-nowrap hidden md:inline-block">
                    Reports and Analytics
                  </span>
                </a>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-regular border-t border-gray-200 dark:border-gray-700">
            <li>
              <Link to="/super-admin/manage-users">
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <MdFolderShared size={25} />
                  <span className="flex-1 ms-3 whitespace-nowrap hidden md:inline-block">
                    User Management
                  </span>
                </a>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-regular border-t border-gray-200 dark:border-gray-700">
            <li>
              {loggedInUser && (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdExitToApp size={25} className="mr-2" />
                  Sign Out
                </button>
              )}
            </li>
          </ul>
        </div>
      </aside>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmSignoutModal
          confirmSignOut={confirmSignOut}
          cancelSignOut={cancelSignOut}
        />
      )}
    </div>
  );
}

export default AdminSideBar;

import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import icon from "../../assets/icon.png";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { VscSignOut, VscSignIn } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ConfirmSignoutModal from "../../components/ui/ConfirmSignoutModal";

function CustomerNavBar() {
  // Function to retrieve the logged-in user from session storage
  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };

  // Get the logged-in user
  const loggedInUser = getLoggedInUser();

  const [nav, setNav] = useState(false);
  const [hovered, setHovered] = useState(false); // State to track hover state
  const handleMouseEnter = () => {
    setHovered(true); // Set hovered to true when mouse enters the icon
  };

  const handleMouseLeave = () => {
    setHovered(false); // Set hovered to false when mouse leaves the icon
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();

  const handleSignIn = () => {
    // Redirect to the sign-in page
    navigate("/signin");
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

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
  return (
    <div>
      {showConfirmation && (
        <ConfirmSignoutModal
          confirmSignOut={confirmSignOut}
          cancelSignOut={cancelSignOut}
        />
      )}
      <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 font-Montserrat font-semibold">
        <div className="flex items-center">
          <Link to="/ph-en">
            <img className="h-8 w-auto" src={icon} alt="" />
          </Link>
          <ul className="hidden md:flex uppercase ml-4">
            <li className="p-4 hover:underline decoration-2">
              <Link to="/book">Book A Delivery</Link>
            </li>
            <li className="p-4 hover:underline decoration-2">
              <Link to="/history">History</Link>
            </li>
            {/* <li className="p-4 hover:underline decoration-2">
              <Link to="/driver-report">Driver Report</Link>
            </li> */}
            <li className="p-4 hover:underline decoration-2">
              <Link to="/complaint">Complaint</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {/* Notifications */}
          {/* <li className="p-4 text-[#10969F] md:text-sm hover:text-teal-900 hover:scale-125 list-none">
            <Link>
              <IoIosNotifications size={25} />
            </Link>
          </li> */}
          {/* User info */}
          <div className="flex items-center gap-4">
            {/* User initials or avatar */}
            <div className="rounded-full bg-teal-200 text-gray-600 dark:text-gray-300 w-10 h-10 flex items-center justify-center">
              {loggedInUser &&
                loggedInUser.EmailAddress.split("@")[0]
                  .slice(0, 2)
                  .toUpperCase()}
            </div>
            {/* User greeting */}
            <div className="font-medium dark:text-white">
              {loggedInUser ? (
                <div>
                  <div>
                    Hello,{" "}
                    {loggedInUser && loggedInUser.EmailAddress.split("@")[0]}!
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Joined on{" "}
                    {loggedInUser &&
                      format(
                        new Date(loggedInUser.DateCreated),
                        "MMMM dd, yyyy"
                      )}
                  </div>
                </div>
              ) : (
                <div>Please log in to access the content.</div>
              )}
            </div>
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={loggedInUser ? handleSignOut : handleSignIn}
              className="block text-left px-2 py-2 text-sm text-teal-800 hover:bg-gray-200 rounded-md"
            >
              <div className="flex flex-row items-center">
                {loggedInUser ? (
                  <>
                    <VscSignOut className="mr-2" size={25} />
                    {hovered && "Sign Out"}{" "}
                    {/* Render "Sign Out" only when hovered */}
                  </>
                ) : (
                  <>
                    <VscSignIn className="mr-2" size={25} />
                    {"Sign In"}
                  </>
                )}
              </div>
            </button>

            {/* Sign out button */}
          </div>
        </div>

        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-300 bg-white ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
          style={{ zIndex: 1 }}
        >
          <img className="m-4 h-8 w-auto mt-[32px]" src={icon} alt="" />
          <ul className="uppercase p-4">
            <li className="p-4 border-b border-gray-200">
              <Link to="/book">Book A Delivery</Link>
            </li>
            <li className="p-4 border-b border-gray-200">
              <Link to="/history">History</Link>
            </li>
            <li className="p-4 border-b border-gray-200">
              <Link to="#">Driver Report</Link>
            </li>
            <li className="p-4">
              <Link to="#">Complaint</Link>
            </li>
          </ul>

          {loggedInUser && (
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white p-2 rounded-md mt-4"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerNavBar;

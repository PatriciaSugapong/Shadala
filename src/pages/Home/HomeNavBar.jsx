import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../../assets/shadala.png";
import { Link } from "react-router-dom";

const Navbar = ({ scrollToSection }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Function to retrieve the logged-in user from session storage
  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };

  // Get the logged-in user
  const loggedInUser = getLoggedInUser();

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 font-Montserrat font-semibold">
      <img className="h-8 w-auto" src={logo} alt="" />
      <ul className="hidden md:flex">
        <li className="p-4 uppercase hover:underline decoration-2">
          <Link to="/ph-en">Home</Link>
        </li>
        <li className="p-4">
          <button
            className="uppercase hover:underline decoration-2"
            onClick={() => scrollToSection("services")}
          >
            Services
          </button>
        </li>
        <li className="p-4">
          <button
            className="uppercase hover:underline decoration-2"
            onClick={() => scrollToSection("team")}
          >
            Meet The Team
          </button>
        </li>
        <li className="p-4">
          <button
            className="uppercase hover:underline decoration-2"
            onClick={() => scrollToSection("careers")}
          >
            Careers
          </button>
        </li>
        {!loggedInUser ? (
          <>
            <li className="p-4 hover:underline decoration-2 text-[#10969F] md:text-sm">
              <Link to="/signin">SIGN IN</Link>
            </li>
            <Link to="/signup">
              <button
                type="button"
                className="text-white bg-[#10969f] hover:bg-[#20848b] font-medium rounded-[20px] px-5 py-2.5 dark:bg-[#10969F] darkhover:bg-[#20848b] focus:outline-none"
              >
                SIGN UP
              </button>
            </Link>
          </>
        ) : (
          <li className="p-4 flex items-center">
            <div className="rounded-full bg-teal-200 text-gray-600 dark:text-gray-300 w-10 h-10 flex items-center justify-center">
              {loggedInUser &&
                loggedInUser.EmailAddress.split("@")[0]
                  .slice(0, 2)
                  .toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-[10px] text-gray-500">
                You are currently logged in as:
              </p>
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                {loggedInUser.EmailAddress}
              </p>
            </div>
          </li>
        )}
      </ul>
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
        <img className="m-4 h-8 w-auto mt-[32px]" src={logo} alt="" />
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-200">
            <Link
              to="/ph-en"
              className="sidebar-link uppercase hover:underline decoration-2"
              onClick={handleNav}
            >
              Home
            </Link>
          </li>
          <li className="p-4 border-b border-gray-200">
            <button
              className="uppercase hover:underline decoration-2"
              onClick={() => scrollToSection("services")}
            >
              Services
            </button>
          </li>
          <li className="p-4 border-b border-gray-200">
            <button
              className="uppercase hover:underline decoration-2"
              onClick={() => scrollToSection("team")}
            >
              Meet The Team
            </button>
          </li>
          <li className="p-4 border-b border-gray-200">
            <button
              className="uppercase hover:underline decoration-2"
              onClick={() => scrollToSection("careers")}
            >
              Careers
            </button>
          </li>
          <li className="p-4 border-b border-gray-200">
            <Link
              to="/signin"
              className="sidebar-link uppercase hover:underline decoration-2"
              onClick={handleNav}
            >
              Sign In
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="/signup"
              className="sidebar-link text-[#10969f] uppercase hover:underline decoration-2"
              onClick={handleNav}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

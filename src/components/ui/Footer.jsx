import React from "react";
import logo from "../../assets/shadala.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer class="text-[#10969fa9] body-font bg-white w-screen bottom-0 left-0">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col ">
          <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img className="h-8 w-auto" src={logo} alt=""></img>
          </a>
          <p class="text-sm text-[#10969fa9] sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 Shadala
          </p>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a class="text-[#10969fa9]">
              <FaFacebook />
            </a>
            <a class="ml-3 text-[#10969fa9]">
              <FaTwitter />
            </a>
            <a class="ml-3 text-[#10969fa9]">
              <FaInstagram />
            </a>
            <a class="ml-3 text-[#10969fa9]">
              <FaLinkedin />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

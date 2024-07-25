import React from "react";
import { FiAlertCircle } from "react-icons/fi"; // Import FiAlertCircle icon
import ClientNavBar from "./CustomerNavBar";
import BookContext from "../../contexts/Customer/BookContext";
import Footer from "../../components/ui/Footer";

function Book() {
  // Function to retrieve the logged-in user from session storage
  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };

  // Get the logged-in user
  const loggedInUser = getLoggedInUser();

  return (
    <div>
      <ClientNavBar />
      <div className="min-h-[80vh] font-Montserrat bg-gradient-to-b from-white via-white to-teal-200 pb-2">
        <div className="max-w-[1240px] mx-auto grid px-4 bg-blue">
          {loggedInUser ? (
            <BookContext />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <FiAlertCircle className="text-6xl text-red-500 mb-4" />
              <p className="text-xl font-semibold">
                You must log in first to access this content.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Book;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import DriverStatusContext from "./DriverStatusContext";
import { getLoggedInUser } from "../../utils/userUtils"; // Import the function

export default function DriverProfileContext() {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [driverProfile, setDriverProfile] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState("");

  const openModal = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  const closeModal = () => {
    setEnlargedImage(null);
  };

  const loggedInUser = getLoggedInUser(); // Get the logged-in user
  let userID = null; // Define userID variable here

  if (loggedInUser) {
    userID = loggedInUser.UserID; // Assign userID if user is logged in
    console.log("Retrieved userID:", userID);
  } else {
    console.log("User not logged in or session data missing.");
  }

  console.log("Fetching driver profile for userID:", userID);

  const fetchDriverProfile = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/drivers/driverProfile?userID=${userID}`
      );
      console.log("Response from backend:", response.data);
      setDriverProfile(response.data);
    } catch (error) {
      console.error("Error fetching driver profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form with userID:", userID); // Add this log

    try {
      // Send a PUT request to your backend to update the profile photo
      const response = await Axios.post(
        `http://localhost:3001/drivers/uploadProfilePhoto`,
        { userID: userID, profilePhoto: profilePhoto }, // Pass userID and profilePhoto in the request body
        {
          headers: {
            "Content-Type": "application/json", // Set the correct content type
          },
        }
      );

      console.log("Profile photo updated successfully:", response.data);
      // Update the driver profile with the new photo URL, assuming your backend returns the updated profile
      // setDriverProfile(response.data.updatedProfile);
    } catch (error) {
      console.error("Error updating profile photo:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchDriverProfile();
    }
  }, [userID]);

  return (
    <div className="mx-5 font-Montserrat">
      <DriverStatusContext />
      <h1 className="text-left text-sm mb-2 font-semibold text-gray-800">
        Profile
      </h1>
      {driverProfile.length > 0 ? (
        <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {driverProfile.map((profile) => (
            <div key={profile.UserID} className="mb-4">
              <div className="p-2 text-sm relative w-1/2">
                <p className="text-[12px] font-bold">Full Name</p>
                <p>
                  {profile.FirstName} {profile.LastName}
                </p>
              </div>
              <div className="p-2 text-sm relative">
                <p className="text-[12px] font-bold">Home Address</p>
                <p>{profile.HomeAddress}</p>
              </div>
              <div className="flex flex-row">
                <div className="p-2 text-sm relative w-1/2">
                  <p className="text-[12px] font-bold">Vehicle Type</p>
                  <p>{profile.VehicleType}</p>{" "}
                </div>
                <div className="p-2 text-sm relative w-1/2">
                  <p className="text-[12px] font-bold">Plate Number</p>
                  <p>{profile.PlateNumber}</p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="p-2 text-sm relative w-1/2">
                  <p className="text-[12px] font-bold">Vehicle Color</p>
                  <p>{profile.VehicleColor}</p>
                </div>
                <div className="p-2 text-sm relative w-1/2">
                  <p className="text-[12px] font-bold">Vehicle Model</p>
                  <p>{profile.VehicleModel}</p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="p-2 text-sm relative w-1/2">
                  <p className="text-[12px] font-bold">License Number</p>
                  <p>{profile.LicenseNumber}</p>
                </div>
                <div className="p-2 text-sm relative w-1/2">
                  <p className="text-[12px] font-bold">Expiration Date</p>
                  <p>
                    {new Date(profile.ExpirationDate).toLocaleDateString(
                      "en-US",
                      { month: "numeric", day: "numeric", year: "numeric" }
                    )}
                  </p>
                </div>
              </div>
              <div className="ml-2">
                <h1 className="text-left text-sm mb-2 font-semibold text-gray-800">
                  Registration Documents
                </h1>
                <div className="overflow-x-auto whitespace-nowrap">
                  <div className="inline-flex space-x-4">
                    <img
                      src={`http://localhost:3001/uploads/${profile.ValidLicenseImg}`} // Assuming the server URL is http://localhost:3001
                      alt="Valid License"
                      onClick={() =>
                        openModal(
                          `http://localhost:3001/uploads/${profile.ValidLicenseImg}`
                        )
                      }
                      style={{ maxWidth: "120px", maxHeight: "60px" }} // Adjust the size as needed
                    />
                    <img
                      src={`http://localhost:3001/uploads/${profile.OfficialReceiptImg}`} // Assuming the server URL is http://localhost:3001
                      alt="Official Reciept"
                      onClick={() =>
                        openModal(
                          `http://localhost:3001/uploads/${profile.OfficialReceiptImg}`
                        )
                      }
                      style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust the size as needed
                    />
                    <img
                      src={`http://localhost:3001/uploads/${profile.CertificateOfRegImg}`} // Assuming the server URL is http://localhost:3001
                      alt="Certificate of Registration"
                      onClick={() =>
                        openModal(
                          `http://localhost:3001/uploads/${profile.CertificateOfRegImg}`
                        )
                      }
                      style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust the size as needed
                    />
                  </div>
                </div>
              </div>
              {/* <form onSubmit={handleSubmit}>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-800 text-left"
                    htmlFor="profilePhoto"
                  >
                    Profile Photo
                  </label>
                  <input
                    onChange={(e) => {
                      setProfilePhoto(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    accept="image/*"
                    id="profilePhoto"
                    name="profilePhoto"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 focus:outline-none"
                >
                  <div className="flex flex-row items-center">
                    Add Profile Photo
                  </div>
                </button>
              </form> */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Modal for enlarged image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-5"
          onClick={closeModal}
        >
          <div className="relative bg-white p-6 rounded-lg max-w-md ">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged Image"
              className="w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

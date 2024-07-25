import React, { useState } from "react";
// import ImageModal from "../ui/ImageModal";
import Axios from "axios";
import SuccessToast from "../../components/ui/SuccessToast";
import { FaEdit } from "react-icons/fa";
const EditDriverInfo = ({
  selectedRow,
  onClose,
  onUpdate,
  fetchDrivers,
  showSuccess,
}) => {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [firstName, setFirstName] = useState(selectedRow.FirstName || "");
  const [lastName, setLastName] = useState(selectedRow.LastName || "");
  const [homeAddress, setHomeAddress] = useState(selectedRow.HomeAddress || "");
  const [vehicleType, setVehicleType] = useState(selectedRow.VehicleType || "");
  const [plateNumber, setPlateNumber] = useState(selectedRow.PlateNumber || "");
  const [vehicleColor, setVehicleColor] = useState(
    selectedRow.VehicleColor || ""
  );
  const [vehicleModel, setVehicleModel] = useState(
    selectedRow.VehicleModel || ""
  );
  {
    console.log(selectedRow.DriverID);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct the updated driver data object
      const updatedDriverData = {
        firstName: firstName,
        lastName: lastName,
        homeAddress: homeAddress,
        vehicleType: vehicleType,
        plateNumber: plateNumber,
        vehicleColor: vehicleColor,
        vehicleModel: vehicleModel,
        // Add other fields as needed
      };

      console.log("Updated Driver Data:", updatedDriverData);

      // Make a PUT request to update driver data
      const response = await Axios.put(
        `http://localhost:3001/drivers/editDriverInfo/${selectedRow.DriverID}`,
        updatedDriverData
      );

      // Log response
      console.log("Response:", response.data);

      // Call onUpdate callback with updated driver data

      onUpdate(response.data); // Make sure onUpdate is correctly passed down and defined
      showSuccess();

      // Close the modal
      onClose();

      fetchDrivers(); // Call the fetchDrivers function passed as a prop
    } catch (error) {
      // Log error
      console.error("Error updating driver information:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-100">
      <div class="relative p-4 max-w-lg">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              <div className="flex flex-row items-center">
                <FaEdit className="mr-2" /> Edit Driver Information
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Uphold this responsibility diligently. Any discrepancies will be
                addressed professionally.
              </p>
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <p></p>
          </div>
          <form class="px-4 py-3">
            <div class="grid gap-4 grid-cols-2">
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name{}
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Home Address
                </label>
                <input
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vehicle Type
                </label>
                <input
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  type="text"
                  name="vehicleType"
                  id="vehicleType"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Plate Number
                </label>
                <input
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  type="text"
                  name="plateNumber"
                  id="plateNumber"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vehicle Color
                </label>
                <input
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  type="text"
                  name="vehicleColor"
                  id="vehicleColor"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vehicle Model
                </label>
                <input
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  type="text"
                  name="vehicleModel"
                  id="vehicleModel"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  License Number
                </label>
                <input
                  value={selectedRow.LicenseNumber}
                  type="text"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Expiration Date
                </label>
                <input
                  value={new Date(
                    selectedRow.ExpirationDate
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                  type="text"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Registration Documents
                  <p className="text-xs text-gray-500">
                    These are non-editable and cannot be modified. Please note
                    that any changes to these documents are not permitted.
                  </p>
                </label>
                <div className="overflow-x-auto whitespace-nowrap">
                  <div className="inline-flex space-x-4">
                    <img
                      className="filter saturate-0 hue-rotate-180"
                      src={`http://localhost:3001/uploads/${selectedRow.ValidLicenseImg}`} // Assuming the server URL is http://localhost:3001
                      alt="Valid License"
                      // onClick={() =>
                      //   openModal(
                      //     `http://localhost:3001/uploads/${selectedRow.ValidLicenseImg}`
                      //   )
                      // }
                      style={{ maxWidth: "120px", maxHeight: "60px" }} // Adjust the size as needed
                    />
                    <img
                      className="filter saturate-0 hue-rotate-180"
                      src={`http://localhost:3001/uploads/${selectedRow.OfficialReceiptImg}`} // Assuming the server URL is http://localhost:3001
                      alt="Official Reciept"
                      // onClick={() =>
                      //   openModal(
                      //     `http://localhost:3001/uploads/${selectedRow.OfficialReceiptImg}`
                      //   )
                      // }
                      style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust the size as needed
                    />
                    <img
                      className="filter saturate-0 hue-rotate-180"
                      src={`http://localhost:3001/uploads/${selectedRow.CertificateOfRegImg}`} // Assuming the server URL is http://localhost:3001
                      alt="Certificate of Registration"
                      // onClick={() =>
                      //   openModal(
                      //     `http://localhost:3001/uploads/${selectedRow.CertificateOfRegImg}`
                      //   )
                      // }
                      style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust the size as needed
                    />
                    {/* {isModalOpen && (
                      <ImageModal
                        imageSrc={selectedImage}
                        closeModal={closeModal}
                      />
                    )} */}
                  </div>
                  <div className="justify-between p-2 border-t rounded-t dark:border-gray-600 mt-5">
                    <div className="flex justify-center mt-2">
                      <button
                        className="mr-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        onClick={handleSubmit}
                      >
                        Save Changes
                      </button>
                      <button
                        className="bg-white-500 outline outline-1 outline-gray-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-teal-800"
                        onClick={onClose}
                      >
                        Discard Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showSuccessToast && <SuccessToast message="Edit successful!" />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDriverInfo;

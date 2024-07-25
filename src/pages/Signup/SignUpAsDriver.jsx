import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";
import Axios from "axios";
import * as yup from "yup";
import { userSchema } from "../../utils/validations/UserValidation";
import { MdError } from "react-icons/md";
import SignUpModalSuccess from "./SignUpModalSuccess";
import { Toast } from "../../components/ui/Toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Footer from "../../components/ui/Footer.jsx";

export default function SignUpAsDriver() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Vehicle Info - Driver Requirements
  const [vehicleModel, setVehicleModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const [vpdlImage, setVPDLImage] = useState("");
  const [certRegImage, setCertRegImage] = useState("");
  const [ORImage, setORImage] = useState("");

  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const [errors, setErrors] = useState({});
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const signUpAsDriver = async (e) => {
    e.preventDefault();

    console.log("Submitting form...");

    let formData = new FormData(); // Create a new FormData object

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("contactNumber", contactNumber);
    formData.append("homeAddress", homeAddress);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("vehicleModel", vehicleModel);
    formData.append("plateNumber", plateNumber);
    formData.append("vehicleType", vehicleType);
    formData.append("vehicleColor", vehicleColor);
    formData.append("licenseNumber", licenseNumber);
    formData.append("expirationDate", expirationDate);
    formData.append("vpdlImage", vpdlImage);
    formData.append("certRegImage", certRegImage);
    formData.append("ORImage", ORImage);
    formData.append("termsAndConditions", termsAndConditions);

    // Debug log to inspect formData
    console.log("Form data before validation:", Object.fromEntries(formData));

    // Extract form data fields excluding file inputs
    const formDataToValidate = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      homeAddress: formData.get("homeAddress"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      vehicleModel: formData.get("vehicleModel"),
      plateNumber: formData.get("plateNumber"),
      vehicleType: formData.get("vehicleType"),
      vehicleColor: formData.get("vehicleColor"),
      licenseNumber: formData.get("licenseNumber"),
      expirationDate: formData.get("expirationDate"),
      termsAndConditions: formData.get("termsAndConditions"),
    };

    try {
      await userSchema.validate(formDataToValidate, { abortEarly: false });
      console.log("Form data validated successfully.");

      const response = await Axios.post(
        "http://localhost:3001/signup/driver",
        formData
      );
      console.log("Form data submitted successfully.");
      console.log("Response:", response.data);

      resetForm();

      setShowModal(true);
      setToastMessage("Account Created Successfully");
    } catch (error) {
      console.error("Error occurred while submitting form:", error);
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    console.log("Resetting form...");
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber("");
    setHomeAddress("");
    setPassword("");
    setConfirmPassword("");

    setVehicleModel("");
    setPlateNumber("");
    setVehicleType("");
    setVehicleColor("");
    setLicenseNumber("");
    setExpirationDate("");

    setVPDLImage(null);
    setCertRegImage(null);
    setORImage(null);

    // Clear file input fields
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = ""; // Reset file input value
    });

    setErrors({});
    setTermsAndConditions(false);
  };

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const handleConfirmPasswordClick = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gradient-to-b from-white via-white to-teal-200 mx-auto text-center flex flex-col justify-center min-h-[90vh]">
      <div className="font-Montserrat w-full max-w-[900px] mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-5">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <Link to="/ph-en">
              <img className="w-auto h-14" src={icon} alt="" />
            </Link>
          </div>

          <h3 className="mt-3 text-xl font-extrabold text-center text-gray-600 dark:text-gray-200">
            Create a Driver Account
          </h3>

          <p className="mb-3 text-[12px] text-center text-gray-500 dark:text-gray-400">
            Join us as a delivery rider and hit the road!
          </p>

          <div className="flex flex-col items-center justify-center">
            <form onSubmit={signUpAsDriver}>
              <h1 className="text-left my-2 font-semibold">
                {" "}
                Account Information
              </h1>
              <div className="grid grid-cols-4 gap-4 mb-2">
                <div className="grid-cols-2">
                  <label
                    className="block text-sm font-medium text-gray-800 text-left"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                      errors.firstName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-teal-500"
                    }`}
                    required
                  />
                  {errors.firstName && (
                    <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                      <span className="mr-1">
                        <MdError />
                      </span>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-800 text-left"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                      errors.lastName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-teal-500"
                    }`}
                    required
                  />
                  {errors.lastName && (
                    <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                      <span className="mr-1">
                        <MdError />
                      </span>
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-800 text-left"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-teal-500"
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                      <span className="mr-1">
                        <MdError />
                      </span>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-800 text-left"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <div className="flex items-center mt-1">
                    <div
                      className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border ${
                        errors.contactNumber
                          ? "text-red-500 bg-red-100 border-red-500"
                          : "text-gray-500 bg-gray-100 border-gray-300"
                      } rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600`}
                    >
                      +63
                    </div>

                    <div className="relative w-full">
                      <input
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        type="text"
                        name="contactNumber"
                        id="phone-input"
                        className={`p-2 w-full border rounded-tr-md rounded-br-md focus:outline-none  ${
                          errors.contactNumber
                            ? "border-red-500 bg-red-50"
                            : "text-gray-500 rounded-e-lg border-s-0 border border-gray-300 focus:ring-teal-500 focus:teal-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-teal-500"
                        }`}
                      />
                    </div>
                  </div>
                  {errors.contactNumber && (
                    <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                      <span className="mr-1">
                        <MdError />
                      </span>
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-800 text-left"
                    htmlFor="homeAddress"
                  >
                    Home Address
                  </label>
                  <input
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    type="text"
                    id="homeAddress"
                    name="homeAddress"
                    className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                      errors.homeAddress
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-teal-500"
                    }`}
                    required
                  />
                  {errors.homeAddress && (
                    <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                      <span className="mr-1">
                        <MdError />
                      </span>
                      {errors.homeAddress}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="col-2">
                  <label
                    className="block text-sm font-medium text-gray-800 text-left"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={passwordEye ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                        errors.password
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-teal-500"
                      }`}
                    />
                    <div class="mt-1 text-[12px] text-gray-500 dark:text-gray-300 text-left">
                      Must be at least 8 characters and contain at least one
                      symbol, one number, one uppercase letter, and one
                      lowercase letter.
                    </div>
                    {errors.password && (
                      <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.password}
                      </p>
                    )}
                    <div className="text-xl absolute top-3 right-4">
                      {!passwordEye ? (
                        <FaRegEyeSlash onClick={handlePasswordClick} />
                      ) : (
                        <FaRegEye onClick={handlePasswordClick} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <label
                    className="block text-sm font-medium text-gray-800 text-left"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={confirmPasswordEye ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                        errors.confirmPassword
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-teal-500"
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.confirmPassword}
                      </p>
                    )}
                    <div className="text-xl absolute top-3 right-4">
                      {!confirmPasswordEye ? (
                        <FaRegEyeSlash onClick={handleConfirmPasswordClick} />
                      ) : (
                        <FaRegEye onClick={handleConfirmPasswordClick} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-left my-2 font-semibold">
                  {" "}
                  Driver Requirements
                </h1>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div className="grid-cols-2">
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="vehicleModel"
                    >
                      Vehicle Model
                    </label>
                    <input
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                        errors.vehicleModel
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-teal-500"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="plateNumber"
                    >
                      Plate Number
                    </label>
                    <input
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      type="text"
                      id="plateNumber"
                      name="plateNumber"
                      className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                        errors.plateNumber
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-teal-500"
                      }`}
                      required
                    />
                    {errors.plateNumber && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.plateNumber}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="vehicleType"
                    >
                      Vehicle Type
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      id="vehicleType"
                      name="vehicleType"
                      className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                        errors.vehicleType
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-teal-500"
                      }`}
                      required
                    >
                      <option selected>Choose a Vehicle Type</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="200kg Sedan">200kg Sedan</option>
                      <option value="600kg MPV">600kg MPV</option>
                      <option value="1000kg Small Truck">
                        1000kg Small Truck
                      </option>
                      <option value="2000kg Medium Truck">
                        2000kg Medium Truck
                      </option>
                      <option value="3000kg Large Truck">
                        3000kg Large Truck
                      </option>
                    </select>
                    {errors.vehicleType && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.vehicleType}
                      </p>
                    )}
                  </div>
                  <div className="grid-cols-2">
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="vehicleColor"
                    >
                      Vehicle Color
                    </label>
                    <input
                      value={vehicleColor}
                      onChange={(e) => setVehicleColor(e.target.value)}
                      type="text"
                      id="vehicleColor"
                      name="vehicleColor"
                      className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                        errors.vehicleColor
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-teal-500"
                      }`}
                      required
                    />
                    {errors.vehicleColor && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.vehicleColor}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div className="grid-cols-2">
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="licenseNumber"
                    >
                      License Number
                    </label>
                    <input
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                        errors.licenseNumber
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-teal-500"
                      }`}
                      required
                    />
                    {errors.licenseNumber && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.expirationDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="expirationDate"
                    >
                      Expiration Date
                    </label>
                    <input
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      type="date"
                      id="expirationDate"
                      name="expirationDate"
                      className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
                        errors.expirationDate
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-teal-500"
                      }`}
                      required
                    />
                    {errors.expirationDate && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.expirationDate}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="vpdlImage"
                    >
                      Valid Professional Driver's License
                    </label>
                    <input
                      onChange={(e) => {
                        setVPDLImage(e.target.files[0]);
                        console.log(e.target.files[0]);
                      }}
                      className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      type="file"
                      accept="image/*"
                      id="vpdlImage"
                      name="vpdlImage"
                      required
                    />
                    {errors.vpdlImage && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.vpdlImage}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="col-2">
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="certRegImage"
                    >
                      Certificate of Registration (CR)
                    </label>
                    <input
                      onChange={(e) => {
                        setCertRegImage(e.target.files[0]);
                        console.log(e.target.files[0]);
                      }}
                      class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      type="file"
                      accept="image/*"
                      id="certRegImage"
                      name="certRegImage"
                      required
                    />
                    {errors.certRegImage && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.certRegImage}
                      </p>
                    )}
                  </div>

                  <div className="col-2">
                    <label
                      className="block text-sm font-medium text-gray-800 text-left"
                      htmlFor="ORImage"
                    >
                      Official Receipt of Vehicle Registration (OR)
                    </label>
                    <input
                      onChange={(e) => {
                        setORImage(e.target.files[0]);
                        console.log(e.target.files[0]);
                      }}
                      class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      type="file"
                      accept="image/*"
                      id="ORImage"
                      name="ORImage"
                    />
                    {errors.ORImage && (
                      <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                        <span className="mr-1">
                          <MdError />
                        </span>
                        {errors.ORImage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-4 mt-5">
                <label htmlFor="checkbox-1" className="flex items-center">
                  <input
                    checked={termsAndConditions}
                    onChange={(e) => setTermsAndConditions(e.target.checked)}
                    id="termsAndConditions"
                    type="checkbox"
                    name="termsAndConditions"
                    className="form-checkbox w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-semibold text-teal-600 dark:text-teal-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      terms and conditions
                    </a>
                    .
                  </span>
                </label>
                {errors.termsAndConditions && (
                  <p className="flex items-center text-sm text-red-600 dark:text-red-500 font-medium">
                    <span className="mr-1">
                      <MdError />
                    </span>
                    {errors.termsAndConditions}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex-1 bg-[#10969f] hover:bg-[#20848b] transition-colors text-white font-medium rounded-lg px-5 py-3"
                >
                  Submit
                </button>
              </div>
            </form>
            {showModal && (
              <SignUpModalSuccess
                isOpen={showModal}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Already have an account?{" "}
          </span>

          <Link
            to="/signin"
            className="mx-2 text-sm font-bold text-teal-500 dark:text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

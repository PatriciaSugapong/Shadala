import React, { useState, useEffect } from "react";
import logo1 from "../../assets/shadala.png";
import Axios from "axios";
import { FaPrint } from "react-icons/fa";

function AdminReportsContext() {
  const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };

  // Get the logged-in user
  const loggedInUser = getLoggedInUser();

  const officeAddress = {
    building: "One Corporate Centre",
    street: "Julia Vargas Avenue",
    barangay: "Ortigas Center",
    city: "Pasig City",
    region: "Metro Manila",
    country: "Philippines",
    zip: "1605",
  };

  const printerDetails = {
    name: loggedInUser ? loggedInUser.EmailAddress : "",
    title: "Administrator",
  };

  const handleToggleColumn = (columnName) => {
    setVisibleColumns((prevVisibleColumns) => {
      if (prevVisibleColumns.includes(columnName)) {
        return prevVisibleColumns.filter((col) => col !== columnName);
      } else {
        return [...prevVisibleColumns, columnName];
      }
    });
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  const fetchBookingsData = async (columnsToShow) => {
    try {
      const response = await Axios.get(
        "http://localhost:3001/bookings/getBookings"
      );
      let dataToShow = response.data;
      if (columnsToShow && columnsToShow.length > 0) {
        dataToShow = response.data.map((entry) =>
          Object.fromEntries(
            Object.entries(entry).filter(([key, value]) =>
              columnsToShow.includes(key)
            )
          )
        );
      }
      return dataToShow;
    } catch (error) {
      console.error("Error fetching bookings data:", error);
      throw error;
    }
  };

  const fetchDriversData = async (columnsToShow) => {
    try {
      const response = await Axios.get("http://localhost:3001/drivers");
      let dataToShow = response.data;
      if (columnsToShow && columnsToShow.length > 0) {
        dataToShow = response.data.map((entry) =>
          Object.fromEntries(
            Object.entries(entry).filter(([key, value]) =>
              columnsToShow.includes(key)
            )
          )
        );
      }
      return dataToShow;
    } catch (error) {
      console.error("Error fetching drivers data:", error);
      throw error;
    }
  };

  const fetchComplaintsData = async (columnsToShow) => {
    try {
      const response = await Axios.get(
        "http://localhost:3001/complaints/getComplaint"
      );
      let dataToShow = response.data;
      if (columnsToShow && columnsToShow.length > 0) {
        dataToShow = response.data.map((entry) =>
          Object.fromEntries(
            Object.entries(entry).filter(([key, value]) =>
              columnsToShow.includes(key)
            )
          )
        );
      }
      return dataToShow;
    } catch (error) {
      console.error("Error fetching complaints data:", error);
      throw error;
    }
  };

  const fetchUsersData = async (columnsToShow) => {
    try {
      const response = await Axios.get("http://localhost:3001/users");
      let dataToShow = response.data;

      // Map data to include only first name and last name based on account type
      dataToShow = response.data.map((entry) => {
        let name = "";
        switch (entry.AccountType) {
          case "Admin":
            name = `${entry.AdminLastName} ${entry.AdminFirstName}`;
            break;
          case "Driver":
            name = `${entry.DriverLastName} ${entry.DriverFirstName}`;
            break;
          case "Customer":
            name = `${entry.CustomerLastName} ${entry.CustomerFirstName}`;
            break;
          default:
            name = `${entry.CustomerLastName} ${entry.CustomerFirstName}`;
            break;
        }
        return {
          UserID: entry.UserID,
          Name: name,
          AccountType: entry.AccountType,
          EmailAddress: entry.EmailAddress,
          DateCreated: entry.DateCreated,
        };
      });

      return dataToShow;
    } catch (error) {
      console.error("Error fetching users data:", error);
      throw error;
    }
  };

  const handleDropdownChange = async (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    switch (option) {
      case "booking":
        try {
          const bookingsData = await fetchBookingsData([
            "BookingID",
            "BookingDate",
            "TrackingNumber",
            "BookingStatus",
            "Name",
            "ParcelOrigin",
            "ParcelDestination",
            "VehicleType",
            "AssignedDriver",
            "ProofOfDelivery",
            "TotalPrice",
          ]);

          // Combine data from all reports
          const allBookingsData = {
            bookings: bookingsData,
          };

          setFilteredData(allBookingsData);
          setVisibleColumns([...Object.keys(bookingsData[0])]);
        } catch (error) {
          console.error("Error fetching all bookings data:", error.message);
          // You can choose to handle errors here as per your requirement
        }
        break;
      case "driver":
        try {
          const driversData = await fetchDriversData([
            "DriverID",
            "FirstName",
            "LastName",
            "HomeAddress",
            "ContactNumber",
            "LicenseNumber",
            "PlateNumber",
            "VehicleModel",
            "VehicleColor",
            "VehicleType",
            "ValidLicenseImg",
            "OfficialReceiptImg",
            "CertificateOfRegImg",
          ]);

          // Combine data from all reports
          const allDriversData = {
            drivers: driversData,
          };

          setFilteredData(allDriversData);
          setVisibleColumns([...Object.keys(driversData[0])]);
        } catch (error) {
          console.error("Error fetching all drivers data:", error.message);
          // You can choose to handle errors here as per your requirement
        }
        break;
      case "complaint":
        try {
          const complaintsData = await fetchComplaintsData([
            "ComplaintID",
            "TrackingNumber",
            "ComplaintStatus",
            "DateFiled",
            "ComplaintType",
            "Attachment",
            "Description",
            "Feedback",
          ]);
          // Combine data from all reports
          const allComplaintsData = {
            complaints: complaintsData,
          };

          setFilteredData(allComplaintsData);
          setVisibleColumns([...Object.keys(complaintsData[0])]);
        } catch (error) {
          console.error("Error fetching all complaints data:", error.message);
          // You can choose to handle errors here as per your requirement
        }
        break;
      case "user":
        try {
          const usersData = await fetchUsersData([
            "UserID",
            "AccountType",
            "Name",
            "EmailAddress",
            "DateCreated",
          ]);

          // Combine data from all reports
          const allUsersData = {
            users: usersData,
          };

          setFilteredData(allUsersData);
          setVisibleColumns([...Object.keys(usersData[0])]);
        } catch (error) {
          console.error("Error fetching all users data:", error.message);
          // You can choose to handle errors here as per your requirement
        }
        break;
      case "all":
        try {
          const bookingsData = await fetchBookingsData([
            "BookingID",
            "BookingDate",
            "TrackingNumber",
            "BookingStatus",
            "Name",
            "ParcelOrigin",
            "ParcelDestination",
            "VehicleType",
            "AssignedDriver",
            "ProofOfDelivery",
            "TotalPrice",
          ]);
          const driversData = await fetchDriversData([
            "DriverID",
            "FirstName",
            "LastName",
            "HomeAddress",
            "ContactNumber",
            "LicenseNumber",
            "PlateNumber",
            "VehicleModel",
            "VehicleColor",
            "VehicleType",
            "ValidLicenseImg",
            "OfficialReceiptImg",
            "CertificateOfRegImg",
          ]);
          const complaintsData = await fetchComplaintsData([
            "ComplaintID",
            "TrackingNumber",
            "ComplaintStatus",
            "DateFiled",
            "ComplaintType",
            "Attachment",
            "Description",
            "Feedback",
          ]);
          const usersData = await fetchUsersData([
            "UserID",
            "AccountType",
            "Name",
            "EmailAddress",
            "DateCreated",
          ]);

          // Combine data from all reports
          const allReportsData = {
            bookings: bookingsData,
            drivers: driversData,
            complaints: complaintsData,
            users: usersData,
          };

          setFilteredData(allReportsData);
          setVisibleColumns([
            ...Object.keys(bookingsData[0]),
            ...Object.keys(driversData[0]),
            ...Object.keys(complaintsData[0]),
            ...Object.keys(usersData[0]),
          ]);
        } catch (error) {
          console.error("Error fetching all reports data:", error.message);
          // You can choose to handle errors here as per your requirement
        }
        break;
      default:
        break;
    }
  };

  const getFormattedDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  const handlePrintPreview = () => {
    const contentToPrint =
      document.getElementById("section-to-print").innerHTML;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            @media print {
              .keytbl {
                font-size: 1.125rem; /* equivalent to text-lg */
                font-weight: 600; /* equivalent to font-semibold */
                margin-bottom: 1rem; /* equivalent to mb-4 */
                text-transform: uppercase; /* uppercase */
              }
              
              .header1 {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
    .header1 .logo-container {
      display: flex;
      align-items: center;
    }
    .header1 .logo-container img {
      width: auto;
      height: auto;
      margin-right: 0.5rem; /* mr-2 */
    }
    .header1 .report-title {
      text-align: right;
    }
    .header1 .report-title h1 {
      font-size: 3rem; /* text-5xl */
      font-weight: 900; /* font-black */
      color: #319795; /* text-teal-500 */
    }
    .header1 .report-title p {
      font-size: 1rem; /* text-medium */
      color: #6b7280; /* text-gray-500 */
    }
              body {
                font-family: 'Montserrat', sans-serif;
              }
              .bg-white {
                background-color: #fff;
              }
              .dark-bg-gray-800 {
                background-color: #1a202c;
              }
              table {
                width: 100%;
                table-layout: auto;
                border: 2px solid #000; /* Add border outline */
              }
              
              th, td {
                padding: 0.75rem;
                word-wrap: break-word;
              }
              th {
                background-color: #4a5568;
                color: #fff;
              }
              tr:nth-child(even) {
                background-color: #f7fafc;
              }
              tr:hover {
                background-color: #edf2f7;
              }
              .header2 {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem; /* equivalent to mb-4 */
              }
              .header2 .half-width {
                width: 50%;
                padding: 1rem; /* equivalent to p-4 */
              }
              .header2 h2 {
                font-size: 1.125rem; /* equivalent to text-lg */
                font-weight: 600; /* equivalent to font-semibold */
                margin-bottom: 0.25rem; /* equivalent to mb-1 */
              }
              .trstyle {
                background-color: #38b2ac !important; /* equivalent to bg-teal-500 */
                color: #fff !important; /* equivalent to text-white */
              }
              .footerstyle {
                text-align: center;
                color: #6b7280; /* text-gray-500 */
                font-size: 0.875rem; /* text-sm */
                margin-top: 1rem; /* mt-8 */
                border-top: 1px solid #d1d5db; /* border-t border-gray-300 */
                padding-top: 1rem; /* pt-4 */
              }
            }
          </style>
        </head>
        <body>
          ${contentToPrint}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const [filterOption, setFilterOption] = useState(""); // This Week, This Month, This Year, or any other custom filter
  // Function to handle radio button change
  const handleRadioButtonChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
  };

  return (
    <div className="p-4 sm:ml-64 font-Montserrat">
      <div className="p-4 rounded-lg dark:border-gray-700 mt-8">
        <h1 className="text-left text-2xl my-2 font-semibold">
          Reports and Analytics
        </h1>
        <div className="font-Montserrat mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 p-5">
          <div className="flex justify-between">
            <div className="w-1/6 p-4">
              <div className="mb-4">
                <label
                  htmlFor="showOptions"
                  className="block font-semibold mb-2"
                >
                  Show
                </label>
                <select
                  id="showOptions"
                  className="border p-2 rounded-md w-full"
                  value={selectedOption}
                  onChange={handleDropdownChange}
                >
                  <option value="">Select a Report</option>
                  <option value="all">All Reports</option>
                  <option value="booking">All Bookings</option>
                  <option value="driver">All Drivers</option>
                  <option value="complaint">All Complaints</option>
                  <option value="user">All Users</option>
                </select>
              </div>
              {/* <h3 class="mb-2  font-semibold text-gray-900 dark:text-white">
                Filter by
              </h3>
              <ul class="mb-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input
                      id="this-day-radio"
                      type="radio"
                      value=""
                      name="list-radio"
                      class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="this-day-radio"
                      class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      This Day
                    </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input
                      id="this-week-radio"
                      type="radio"
                      value=""
                      name="list-radio"
                      class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="this-week-radio"
                      class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      This Week
                    </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input
                      id="this-month-radio"
                      type="radio"
                      value=""
                      name="list-radio"
                      class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="this-month-radio"
                      class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      This Month
                    </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input
                      id="this-year-radio"
                      type="radio"
                      value=""
                      name="list-radio"
                      class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="this-year-radio"
                      class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      This Year
                    </label>
                  </div>
                </li>
              </ul> */}

              <button
                onClick={handlePrintPreview}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center"
              >
                <FaPrint className="mr-2" />
                Print Preview
              </button>
            </div>

            <div className="w-5/6 p-4">
              <div
                className="border border-teal-500 rounded-lg p-4"
                id="section-to-print"
              >
                <div className="header1 flex items-center justify-between mb-4">
                  <div className="flex items-center logo-container">
                    <h1 className="text-2xl font-semibold text-teal-500">
                      <img
                        src={logo1}
                        alt="shadala logo"
                        className="w-auto h-auto mr-2"
                      />
                    </h1>
                  </div>
                  <div className=" report-title text-right">
                    <h1 className="text-5xl font-black text-teal-500">
                      REPORT
                    </h1>
                    <p className="text-medium text-gray-500">
                      {getFormattedDate()}
                    </p>
                  </div>
                </div>
                <div className="header2 flex justify-between">
                  <div className="w-1/2 p-4">
                    <h2 className="text-lg font-semibold mb-1">
                      Office Address:
                    </h2>
                    <p>{officeAddress.building}</p>
                    <p>{`${officeAddress.street}, ${officeAddress.barangay}`}</p>
                    <p>{`${officeAddress.city}, ${officeAddress.region}, ${officeAddress.country}, ${officeAddress.zip}`}</p>
                  </div>
                  <div className="half-width w-1/2 p-4">
                    <h2 className="text-lg font-semibold mb-1">Prepared by:</h2>
                    <p>
                      <strong>{printerDetails.name}</strong>
                    </p>
                    <p>{printerDetails.title}</p>
                  </div>
                </div>
                <div className="overflow-auto">
                  {/* Display filtered data based on selected option */}
                  {selectedOption === "all" &&
                    filteredData &&
                    Object.keys(filteredData).map((key, index) => (
                      <div key={index}>
                        <h2 className="keytbl text-lg font-semibold mb-4 uppercase">
                          {key}
                        </h2>
                        <table className="w-full mb-4">
                          <thead>
                            <tr className="trstyle bg-teal-500 text-white">
                              {Object.keys(filteredData[key][0]).map(
                                (column, columnIndex) => (
                                  <th key={columnIndex} className="py-2 px-4">
                                    {column}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData[key].map((entry, entryIndex) => (
                              <tr
                                key={entryIndex}
                                className="border-b border-gray-200"
                              >
                                {Object.keys(entry).map(
                                  (column, columnIndex) => (
                                    <td key={columnIndex} className="py-2 px-4">
                                      {column === "ProofOfDelivery" &&
                                      entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="Proof of Delivery"
                                        />
                                      ) : column === "ValidLicenseImg" &&
                                        entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="ValidLicenseImg"
                                        />
                                      ) : column === "CertificateOfRegImg" &&
                                        entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="CertificateOfRegImg"
                                        />
                                      ) : column === "OfficialReceiptImg" &&
                                        entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="OfficialReceiptImg"
                                        />
                                      ) : column === "Attachment" &&
                                        entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="Attachment"
                                        />
                                      ) : column === "AssignedDriver" &&
                                        entry[column] === null ? (
                                        <span className="text-xs text-gray-300">
                                          No assigned driver
                                        </span>
                                      ) : column === "BookingDate" ? (
                                        new Date(
                                          entry[column]
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      ) : column === "DateCreated" ? (
                                        new Date(
                                          entry[column]
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      ) : column === "DateFiled" ? (
                                        new Date(
                                          entry[column]
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      ) : (
                                        entry[column]
                                      )}
                                    </td>
                                  )
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}

                  {selectedOption === "booking" &&
                    filteredData &&
                    Object.keys(filteredData).map((key, index) => (
                      <div key={index}>
                        <h2 className="keytbl text-lg font-semibold mb-4 uppercase">
                          {key}
                        </h2>
                        <table className="w-full mb-4">
                          <thead>
                            <tr className="trstyle bg-teal-500 text-white">
                              {Object.keys(filteredData[key][0]).map(
                                (column, columnIndex) => (
                                  <th key={columnIndex} className="py-2 px-4">
                                    {column}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData[key].map((entry, entryIndex) => (
                              <tr
                                key={entryIndex}
                                className="border-b border-gray-200"
                              >
                                {Object.keys(entry).map(
                                  (column, columnIndex) => (
                                    <td key={columnIndex} className="py-2 px-4">
                                      {column === "ProofOfDelivery" &&
                                      entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="Proof of Delivery"
                                        />
                                      ) : column === "BookingDate" ? (
                                        new Date(
                                          entry[column]
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      ) : (
                                        entry[column]
                                      )}
                                    </td>
                                  )
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}

                  {selectedOption === "driver" &&
                    filteredData &&
                    Object.keys(filteredData).map((key, index) => (
                      <div key={index}>
                        <h2 className="keytbl text-lg font-semibold mb-4 uppercase">
                          {key}
                        </h2>
                        <table className="w-full mb-4">
                          <thead>
                            <tr className="trstyle bg-teal-500 text-white">
                              {Object.keys(filteredData[key][0]).map(
                                (column, columnIndex) => (
                                  <th key={columnIndex} className="py-2 px-4">
                                    {column}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData[key].map((entry, entryIndex) => (
                              <tr
                                key={entryIndex}
                                className="border-b border-gray-200"
                              >
                                {Object.keys(entry).map(
                                  (column, columnIndex) => (
                                    <td key={columnIndex} className="py-2 px-4">
                                      {column === "ValidLicenseImg" &&
                                      entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="ValidLicenseImg"
                                        />
                                      ) : column === "CertificateOfRegImg" &&
                                        entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="CertificateOfRegImg"
                                        />
                                      ) : column === "OfficialReceiptImg" &&
                                        entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="OfficialReceiptImg"
                                        />
                                      ) : column === "DateCreated" ? (
                                        new Date(
                                          entry[column]
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      ) : (
                                        entry[column]
                                      )}
                                    </td>
                                  )
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}

                  {selectedOption === "complaint" &&
                    filteredData &&
                    Object.keys(filteredData).map((key, index) => (
                      <div key={index}>
                        <h2 className="keytbl text-lg font-semibold mb-4 uppercase">
                          {key}
                        </h2>
                        <table className="w-full mb-4">
                          <thead>
                            <tr className="trstyle bg-teal-500 text-white">
                              {Object.keys(filteredData[key][0]).map(
                                (column, columnIndex) => (
                                  <th key={columnIndex} className="py-2 px-4">
                                    {column}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData[key].map((entry, entryIndex) => (
                              <tr
                                key={entryIndex}
                                className="border-b border-gray-200"
                              >
                                {Object.keys(entry).map(
                                  (column, columnIndex) => (
                                    <td key={columnIndex} className="py-2 px-4">
                                      {column === "Attachment" &&
                                      entry[column] ? (
                                        <img
                                          src={`http://localhost:3001/uploads/${entry[column]}`}
                                          style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                          }}
                                          alt="Attachment"
                                        />
                                      ) : column === "DateFiled" ? (
                                        new Date(
                                          entry[column]
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      ) : (
                                        entry[column]
                                      )}
                                    </td>
                                  )
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}

                  {selectedOption === "user" &&
                    filteredData &&
                    Object.keys(filteredData).map((key, index) => (
                      <div key={index}>
                        <h2 className="keytbl text-lg font-semibold mb-4 uppercase">
                          {key}
                        </h2>
                        <table className="w-full mb-4">
                          <thead>
                            <tr className="trstyle bg-teal-500 text-white">
                              {Object.keys(filteredData[key][0]).map(
                                (column, columnIndex) => (
                                  <th key={columnIndex} className="py-2 px-4">
                                    {column}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData[key].map((entry, entryIndex) => (
                              <tr
                                key={entryIndex}
                                className="border-b border-gray-200"
                              >
                                {Object.keys(entry).map(
                                  (column, columnIndex) => (
                                    <td key={columnIndex} className="py-2 px-4">
                                      {column === "DateCreated"
                                        ? new Date(
                                            entry[column]
                                          ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })
                                        : entry[column]}
                                    </td>
                                  )
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                </div>
                <div className="mt-4">
                  <footer className="footerstyle text-center text-gray-500 text-sm mt-8 border-t border-gray-300 pt-4">
                    <p className="">
                      &copy; {new Date().getFullYear()} Shadala All rights.
                      reserved.
                    </p>
                    <p className="mb-2">Your Padala, Our Priority</p>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReportsContext;

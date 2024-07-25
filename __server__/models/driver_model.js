import db from "../config/db.js";

class DriverModel {
  static add(
    userID,
    vehicleID,
    firstName,
    lastName,
    homeAddress,
    contactNumber,
    licenseNumber,
    expirationDate,
    status
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO driver_tbl (UserID, VehicleID, FirstName, LastName, HomeAddress, ContactNumber, LicenseNumber, ExpirationDate, CurrentStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userID,
          vehicleID,
          firstName,
          lastName,
          homeAddress,
          contactNumber,
          licenseNumber,
          expirationDate,
          status,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  }

  static updateDriverID(driverID, vehicleID) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE vehicle_tbl SET DriverID = ? WHERE VehicleID = ?",
        [driverID, vehicleID],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static async editDriverInfo(
    driverID,
    firstName,
    lastName,
    homeAddress,
    vehicleType,
    plateNumber,
    vehicleColor,
    vehicleModel
  ) {
    try {
      // Update driver information
      await new Promise((resolve, reject) => {
        db.query(
          "UPDATE driver_tbl SET FirstName = ?, LastName = ?, HomeAddress = ? WHERE DriverID = ?",
          [firstName, lastName, homeAddress, driverID],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });

      // Update vehicle information
      await new Promise((resolve, reject) => {
        db.query(
          "UPDATE vehicle_tbl SET VehicleType = ?, PlateNumber = ?, VehicleColor = ?, VehicleModel = ? WHERE DriverID = ?",
          [vehicleType, plateNumber, vehicleColor, vehicleModel, driverID],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });

      return "Driver and vehicle information updated successfully";
    } catch (error) {
      throw error;
    }
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          driver_tbl.*,
          CONCAT(driver_tbl.FirstName, ' ', driver_tbl.LastName) AS DriverName,
          vehicle_tbl.ValidLicenseImg AS ValidLicenseImg,
          vehicle_tbl.CertificateOfRegImg AS CertificateOfRegImg,
          vehicle_tbl.OfficialReceiptImg AS OfficialReceiptImg,
          vehicle_tbl.VehicleType,
          vehicle_tbl.PlateNumber,
          vehicle_tbl.VehicleModel,
          vehicle_tbl.VehicleColor
        FROM 
          driver_tbl
        LEFT JOIN 
          vehicle_tbl ON driver_tbl.DriverID = vehicle_tbl.DriverID 
        ORDER BY driver_tbl.DriverID DESC
      `;

      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async getDriverProfile(userID) {
    return new Promise((resolve, reject) => {
      // Query to fetch DriverID based on UserID from customer_tbl
      const query = `
        SELECT 
          driver_tbl.DriverID
        FROM 
          driver_tbl
        INNER JOIN 
          user_details_tbl ON driver_tbl.UserID = user_details_tbl.UserID
        WHERE 
          user_details_tbl.UserID = ?;
      `;

      db.query(query, [userID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const driverID = results[0].DriverID;
            // Once DriverID is obtained, fetch profile based on it
            const driverProfileQuery = `
            SELECT 
            driver_tbl.*,
            vehicle_tbl.PlateNumber,
            vehicle_tbl.VehicleModel,
            vehicle_tbl.VehicleColor,
            vehicle_tbl.VehicleType,
            vehicle_tbl.ValidLicenseImg,
            vehicle_tbl.OfficialReceiptImg,
            vehicle_tbl.CertificateOfRegImg
        FROM 
            driver_tbl
        LEFT JOIN 
            vehicle_tbl ON driver_tbl.DriverID = vehicle_tbl.DriverID
        WHERE
            driver_tbl.DriverID = ?;
        
`;

            db.query(
              driverProfileQuery,
              [driverID],
              (err, driverProfileResults) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(driverProfileResults);
                }
              }
            );
          } else {
            // If no driver found with the provided userID
            reject("No driver found with the provided userID");
          }
        }
      });
    });
  }

  static async getDriverHistory(userID) {
    return new Promise((resolve, reject) => {
      // Query to fetch DriverID based on UserID from driver_tbl
      const query = `
        SELECT 
          driver_tbl.DriverID
        FROM 
          driver_tbl
        INNER JOIN 
          user_details_tbl ON driver_tbl.UserID = user_details_tbl.UserID
        WHERE 
          user_details_tbl.UserID = ?;
      `;

      console.log("UserID:", userID);
      db.query(query, [userID], (err, results) => {
        if (err) {
          console.error("Error fetching DriverID:", err);
          reject(err);
        } else {
          if (results.length > 0) {
            const driverID = results[0].DriverID;
            console.log("DriverID:", driverID);
            const driverHistoryQuery = `
            SELECT 
            booking_tbl.*,
            CONCAT(customer_tbl.FirstName, ' ', customer_tbl.LastName) AS CustomerName
        FROM 
            booking_tbl
        INNER JOIN
            customer_tbl ON booking_tbl.CustomerID = customer_tbl.CustomerID
        WHERE
            AssignedDriver = ?;
    `;

            db.query(driverHistoryQuery, [driverID], (err, result) => {
              if (err) {
                console.error("Error fetching driver history:", err);
                reject(err);
              } else {
                console.log("Driver history:", result);
                resolve(result);
              }
            });
          } else {
            // If no driver found with the provided userID
            console.error("No driver found with the provided userID");
            reject("No driver found with the provided userID");
          }
        }
      });
    });
  }

  static toggleStatus(userID, status) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE driver_tbl SET CurrentStatus = ? WHERE UserID = ?",
        [status, userID],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  //
  static async archiveDriverData(driverID) {
    return new Promise((resolve, reject) => {
      try {
        const selectQuery = `
          SELECT
            d.DriverID,
            d.CurrentStatus,
            CONCAT(d.FirstName, ' ', d.LastName) AS Name,
            v.VehicleType,
            d.LicenseNumber,
            v.PlateNumber,
            u.UserID,
            u.EmailAddress,
            u.Password,
            u.DateCreated
          FROM
            driver_tbl d
          JOIN
            vehicle_tbl v ON d.DriverID = v.DriverID
          JOIN
            user_details_tbl u ON d.UserID = u.UserID
          WHERE
            d.DriverID = ?;
        `;

        const insertDriverQuery = `
        INSERT INTO archived_driver_tbl (
          DriverID,
          Status,
          Name,
          VehicleType,
          LicenseNumber,
          PlateNumber,
          EmailAddress,
          Password,
          DateCreated
        ) 
        SELECT
          d.DriverID,
          d.CurrentStatus,
          CONCAT(d.FirstName, ' ', d.LastName) AS Name,
          v.VehicleType,
          d.LicenseNumber,
          v.PlateNumber,
          u.EmailAddress,
          u.Password,
          u.DateCreated
        FROM
          driver_tbl d
        JOIN
          vehicle_tbl v ON d.DriverID = v.DriverID
        JOIN
          user_details_tbl u ON d.UserID = u.UserID
        WHERE
          d.DriverID = ?;
      `;

        const insertVehicleQuery = `
          INSERT INTO archived_vehicle_tbl (
            VehicleID,
            DriverID,
            PlateNumber,
            VehicleModel,
            VehicleColor,
            VehicleType,
            ValidLicenseImg,
            OfficialReceiptImg,
            CertificateOfRegImg
          )
          SELECT
            v.VehicleID,
            v.DriverID,
            v.PlateNumber,
            v.VehicleModel,
            v.VehicleColor,
            v.VehicleType,
            v.ValidLicenseImg,
            v.OfficialReceiptImg,
            v.CertificateOfRegImg
          FROM
            vehicle_tbl v
          WHERE
            v.DriverID = ?;
        `;

        const deleteUserDetailsQuery = `
          DELETE FROM user_details_tbl WHERE UserID = ?;
        `;

        const deleteDriverQuery = `
          DELETE FROM driver_tbl WHERE DriverID = ?;
        `;

        const deleteVehicleQuery = `
          DELETE FROM vehicle_tbl WHERE DriverID = ?;
        `;

        // Execute the select query to fetch driver details
        db.query(selectQuery, [driverID], (error, results) => {
          if (error) {
            console.error("Error fetching driver details:", error);
            reject(error); // Reject the Promise if there's an error
            return;
          }

          const driverDetails = results[0]; // Assuming only one row will be returned

          // Execute the insert query to archive driver details
          db.query(
            insertDriverQuery,
            [driverID],
            (error, insertDriverResult) => {
              if (error) {
                console.error("Error archiving driver:", error);
                reject(error); // Reject the Promise if there's an error
              } else {
                // Execute the insert query to archive vehicle details
                db.query(
                  insertVehicleQuery,
                  [driverID],
                  (error, insertVehicleResult) => {
                    if (error) {
                      console.error("Error archiving vehicle:", error);
                      reject(error); // Reject the Promise if there's an error
                    } else {
                      // Execute the delete query to remove driver from the original table
                      db.query(
                        deleteDriverQuery,
                        [driverID],
                        (error, deleteDriverResult) => {
                          if (error) {
                            console.error("Error deleting driver:", error);
                            reject(error); // Reject the Promise if there's an error
                          } else {
                            // Execute the delete query to remove vehicle related to the driver
                            db.query(
                              deleteVehicleQuery,
                              [driverID],
                              (error, deleteVehicleResult) => {
                                if (error) {
                                  console.error(
                                    "Error deleting vehicle:",
                                    error
                                  );
                                  reject(error); // Reject the Promise if there's an error
                                } else {
                                  // Get the UserID of the driver
                                  const userID = driverDetails
                                    ? driverDetails.UserID
                                    : null;

                                  // Execute the delete query to remove user details based on the UserID
                                  db.query(
                                    deleteUserDetailsQuery,
                                    [userID],
                                    (error, deleteUserDetailsResult) => {
                                      if (error) {
                                        console.error(
                                          "Error deleting user details:",
                                          error
                                        );
                                        reject(error); // Reject the Promise if there's an error
                                      } else {
                                        resolve({
                                          success: true,
                                          message:
                                            "Driver, related vehicle, and user details archived successfully",
                                          archivedDriverData: driverDetails,
                                        }); // Resolve with success message and archived driver details
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        });
      } catch (error) {
        console.error("Error archiving driver:", error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  }

  // static async uploadProfilePhoto(userID, profilePhoto) {
  //   return new Promise((resolve, reject) => {
  //     db.query(
  //       "INSERT INTO driver_tbl (UserID, ProfilePhoto) VALUES (?, ?)",
  //       [userID, profilePhoto],
  //       (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       }
  //     );
  //   });
  // }

  static async countAvailableDrivers() {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT COUNT(*) AS AvailableDriversCount
            FROM 
                driver_tbl
            WHERE 
                driver_tbl.CurrentStatus = 'Available';
        `;

      console.log("Executing query to count available drivers...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error counting available drivers:", err);
          reject(err);
        } else {
          console.log("Successfully counted available drivers.");
          resolve(results[0].AvailableDriversCount);
        }
      });
    });
  }
}

export default DriverModel;

import db from "../config/db.js";

class BookingModel {
  static addBookingDetails(
    userID,
    receiverName,
    receiverContactNum,
    receiverBlockNum,
    parcelDestination,
    senderName,
    senderContactNum,
    senderBlockNum,
    parcelOrigin,
    vehicleType,
    totalPrice
  ) {
    const bookingDate = new Date(); // Generate booking date
    const trackingNumber = BookingModel.generateTrackingNumber(); // Generate tracking number

    return new Promise((resolve, reject) => {
      console.log("Fetching CustomerID based on UserID:", userID);
      // Query to fetch CustomerID based on UserID from customer_tbl
      db.query(
        "SELECT customer_tbl.CustomerID FROM customer_tbl INNER JOIN user_details_tbl ON user_details_tbl.UserID = customer_tbl.UserID WHERE user_details_tbl.UserID = ?",
        [userID],
        (err, results) => {
          if (err) {
            console.error("Error fetching CustomerID:", err);
            reject(err);
          } else {
            console.log("Results:", results);
            if (results.length > 0) {
              const customerID = results[0].CustomerID;
              console.log("CustomerID found:", customerID);
              // Now we have the customerID, insert into booking_tbl
              db.query(
                "INSERT INTO booking_tbl (CustomerID, TrackingNumber, ParcelDestination, ParcelOrigin, VehicleType, BookingDate, BookingStatus, AssignedDriver, TotalPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  customerID,
                  trackingNumber,
                  parcelDestination,
                  parcelOrigin,
                  vehicleType,
                  bookingDate,
                  "Pending", // Set the booking status to "Pending"
                  "No Driver Assigned",
                  totalPrice,
                ],
                (err, result) => {
                  if (err) {
                    console.error("Error inserting booking details:", err);
                    reject(err);
                  } else {
                    console.log(
                      "Booking details inserted successfully:",
                      result
                    );
                    const bookingID = result.insertId;
                    // Insert into receiver_tbl
                    db.query(
                      "INSERT INTO receiver_tbl (BookingID, ReceiverName, ReceiverContactNum, ReceiverBlockNum) VALUES (?, ?, ?, ?)",
                      [
                        bookingID,
                        receiverName,
                        receiverContactNum,
                        receiverBlockNum,
                      ],
                      (err, result) => {
                        if (err) {
                          console.error(
                            "Error inserting receiver details:",
                            err
                          );
                          reject(err);
                        } else {
                          console.log(
                            "Receiver details inserted successfully:",
                            result
                          );
                          // Insert into sender_tbl
                          db.query(
                            "INSERT INTO sender_tbl (BookingID, SenderName, SenderContactNum, SenderBlockNum) VALUES (?, ?, ?, ?)",
                            [
                              bookingID,
                              senderName,
                              senderContactNum,
                              senderBlockNum,
                            ],
                            (err, result) => {
                              if (err) {
                                console.error(
                                  "Error inserting sender details:",
                                  err
                                );
                                reject(err);
                              } else {
                                console.log(
                                  "Sender details inserted successfully:",
                                  result
                                );
                                resolve(result);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            } else {
              console.log("User not found or associated with a customer");
              reject("User not found or associated with a customer");
            }
          }
        }
      );
    });
  }

  static generateTrackingNumber() {
    // Generate a random tracking number
    const trackingNumber = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    return "SHD" + trackingNumber; // Prepend "SHD" to the generated tracking number
  }

  static async getBookingHistoryDetails(userID) {
    return new Promise((resolve, reject) => {
      // Query to fetch CustomerID based on UserID from customer_tbl
      const query = `
        SELECT 
          customer_tbl.CustomerID
        FROM 
          customer_tbl
        INNER JOIN 
          user_details_tbl ON customer_tbl.UserID = user_details_tbl.UserID
        WHERE 
          user_details_tbl.UserID = ?;
      `;

      db.query(query, [userID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const customerID = results[0].CustomerID;
            // Once CustomerID is obtained, fetch booking history based on it
            const bookingHistoryQuery = `
              SELECT 
                booking_tbl.BookingID,
                booking_tbl.TrackingNumber,
                booking_tbl.BookingDate AS DateBooked,
                booking_tbl.BookingStatus,
                booking_tbl.ProofOfDelivery,
                booking_tbl.ParcelOrigin,
                booking_tbl.ParcelDestination,
                booking_tbl.VehicleType,
                booking_tbl.TotalPrice,
                CONCAT(driver_tbl.FirstName, ' ', driver_tbl.LastName) AS AssignedDriver,
                sender_tbl.SenderName,
                sender_tbl.SenderContactNum,
                receiver_tbl.ReceiverName,
                receiver_tbl.ReceiverContactNum,
                vehicle_tbl.VehicleID,
                vehicle_tbl.PlateNumber,
                vehicle_tbl.VehicleModel,
                vehicle_tbl.VehicleColor
              FROM 
                booking_tbl
              LEFT JOIN sender_tbl ON booking_tbl.BookingID = sender_tbl.BookingID
              LEFT JOIN receiver_tbl ON booking_tbl.BookingID = receiver_tbl.BookingID
              LEFT JOIN driver_tbl ON booking_tbl.AssignedDriver = driver_tbl.DriverID
              LEFT JOIN vehicle_tbl ON driver_tbl.DriverID = vehicle_tbl.DriverID
              WHERE
                booking_tbl.CustomerID = ?;
            `;

            db.query(
              bookingHistoryQuery,
              [customerID],
              (err, bookingResults) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(bookingResults);
                }
              }
            );
          } else {
            // If no customer found with the provided userID
            reject("No customer found with the provided userID");
          }
        }
      });
    });
  }

  static async cancelBooking(bookingID) {
    return new Promise((resolve, reject) => {
      // Query to update the booking status to "Cancelled" based on the BookingID
      const query = `
        UPDATE booking_tbl
        SET BookingStatus = 'Cancelled'
        WHERE BookingID = ?;
      `;

      db.query(query, [bookingID], (err, cancelResult) => {
        if (err) {
          reject(err);
        } else {
          resolve(cancelResult);
        }
      });
    });
  }

  static async getParcelInfo(trackingNumber) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
    booking_tbl.*, 
    receiver_tbl.ReceiverName, 
    receiver_tbl.ReceiverContactNum, 
    receiver_tbl.ReceiverBlockNum, 
    sender_tbl.SenderName, 
    sender_tbl.SenderContactNum, 
    sender_tbl.SenderBlockNum 
FROM 
    booking_tbl
LEFT JOIN 
    receiver_tbl ON booking_tbl.BookingID = receiver_tbl.BookingID
LEFT JOIN 
    sender_tbl ON booking_tbl.BookingID = sender_tbl.BookingID
WHERE 
    booking_tbl.TrackingNumber = ?;

  `;

      console.log("Executing query to fetch parcel info...");
      db.query(query, [trackingNumber], (err, results) => {
        if (err) {
          console.error("Error fetching parcel info:", err);
          reject(err);
        } else {
          console.log("Successfully fetched parcel info.");
          resolve(results);
        }
      });
    });
  }

  static async getPendingBookings() {
    return new Promise((resolve, reject) => {
      const query = `SELECT DISTINCT
            booking_tbl.*,
            customer_tbl.FirstName,
            customer_tbl.LastName,
            receiver_tbl.ReceiverName,
            receiver_tbl.ReceiverContactNum,
            receiver_tbl.ReceiverBlockNum,
            sender_tbl.SenderName,
            sender_tbl.SenderContactNum,
            sender_tbl.SenderBlockNum
        FROM 
            booking_tbl
        INNER JOIN 
            customer_tbl ON booking_tbl.CustomerID = customer_tbl.CustomerID
        INNER JOIN 
            receiver_tbl ON booking_tbl.BookingID = receiver_tbl.BookingID
        INNER JOIN 
            sender_tbl ON booking_tbl.BookingID = sender_tbl.BookingID
        WHERE 
            booking_tbl.BookingStatus = 'Pending';
        
        `;

      console.log("Executing query to fetch pending bookings...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching pending bookings:", err);
          reject(err);
        } else {
          console.log("Successfully fetched pending bookings.");
          resolve(results);
        }
      });
    });
  }

  static async getInTransitBookings() {
    return new Promise((resolve, reject) => {
      const query = `SELECT
      booking_tbl.*,
      customer_tbl.FirstName,
      customer_tbl.LastName,
      receiver_tbl.ReceiverName,
      receiver_tbl.ReceiverContactNum,
      receiver_tbl.ReceiverBlockNum,
      sender_tbl.SenderName,
      sender_tbl.SenderContactNum,
      sender_tbl.SenderBlockNum,
      CONCAT(driver_tbl.FirstName, ' ', driver_tbl.LastName) AS AssignedDriver

  FROM 
      booking_tbl
  INNER JOIN 
      customer_tbl ON booking_tbl.CustomerID = customer_tbl.CustomerID
  INNER JOIN 
      receiver_tbl ON booking_tbl.BookingID = receiver_tbl.BookingID
  INNER JOIN 
      sender_tbl ON booking_tbl.BookingID = sender_tbl.BookingID
  LEFT JOIN 
      driver_tbl ON booking_tbl.AssignedDriver = driver_tbl.DriverID
  WHERE 
      BookingStatus IN ('In Transit', 'For Pickup', 'Delivered');
  
        `;

      console.log("Executing query to fetch in transit bookings...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching in transit bookings:", err);
          reject(err);
        } else {
          console.log("Successfully fetched in transit bookings.");
          resolve(results);
        }
      });
    });
  }

  static async getPendingBookingsByUserID(userID) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT
        booking_tbl.*,
        customer_tbl.FirstName,
        customer_tbl.LastName
      FROM 
        booking_tbl
      INNER JOIN 
        customer_tbl ON booking_tbl.CustomerID = customer_tbl.CustomerID
      WHERE 
        booking_tbl.BookingStatus = 'Pending' AND
        customer_tbl.UserID = ?;
    `;

      console.log(
        "Executing query to fetch pending bookings for user ID",
        userID
      );
      db.query(query, [userID], (err, results) => {
        if (err) {
          console.error("Error fetching pending bookings:", err);
          reject(err);
        } else {
          console.log(
            "Successfully fetched pending bookings for user ID",
            userID
          );
          resolve(results);
        }
      });
    });
  }

  static async countPendingBookings() {
    return new Promise((resolve, reject) => {
      const query = `
              SELECT COUNT(*) AS PendingCount
              FROM 
                  booking_tbl
              WHERE 
                  booking_tbl.BookingStatus = 'Pending';
          `;

      console.log("Executing query to count pending bookings...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error counting pending bookings:", err);
          reject(err);
        } else {
          console.log("Successfully counted pending bookings.");
          resolve(results[0].PendingCount);
        }
      });
    });
  }

  static async countCompletedBookings() {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT COUNT(*) AS CompletedCount
            FROM 
                booking_tbl
            WHERE 
                booking_tbl.BookingStatus = 'Completed';
        `;

      console.log("Executing query to count completed bookings...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error counting completed bookings:", err);
          reject(err);
        } else {
          console.log("Successfully counted completed bookings.");
          resolve(results[0].CompletedCount);
        }
      });
    });
  }

  static async calculateWeeklyRevenue() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT WEEK(BookingDate) AS WeekNumber,
               YEAR(BookingDate) AS Year,
               SUM(TotalPrice) AS WeeklyRevenue
        FROM booking_tbl
        WHERE BookingStatus = 'Completed'
              AND YEAR(BookingDate) = YEAR(CURDATE())
        GROUP BY YEAR(BookingDate), WEEK(BookingDate)
        ORDER BY YEAR(BookingDate) ASC, WEEK(BookingDate) ASC;
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

  static async updateBookingStatus(userID, bookingID, bookingStatus) {
    return new Promise((resolve, reject) => {
      // Query to fetch DriverID based on UserID from driver_tbl
      const query = `
        SELECT 
            driver_tbl.DriverID as AssignedDriver
        FROM 
            driver_tbl
        INNER JOIN 
            user_details_tbl ON driver_tbl.UserID = user_details_tbl.UserID
        WHERE 
            driver_tbl.UserID = ?;
        `;

      db.query(query, [userID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const assignedDriver = results[0].AssignedDriver;
            // Query to update the booking status and assign the driver
            const updateQuery = `
                    UPDATE booking_tbl
                    SET BookingStatus = ?, AssignedDriver = ?
                    WHERE BookingID = ?;
                    `;
            db.query(
              updateQuery,
              [bookingStatus, assignedDriver, bookingID],
              (updateErr, result) => {
                if (updateErr) {
                  console.error("Error updating booking status:", updateErr);
                  reject(updateErr);
                } else {
                  console.log("Booking status updated successfully");
                  resolve(result);
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

  static async archiveBooking(bookingID) {
    return new Promise((resolve, reject) => {
      try {
        const query = `
          UPDATE booking_tbl
          SET RecordStatus = "Archived"
          WHERE BookingID = ?;
        `;
        // Execute the query with the bookingID
        db.query(query, [bookingID], (error, results) => {
          if (error) {
            console.error("Error archiving booking:", error);
            reject(error); // Reject the Promise if there's an error
          } else {
            resolve({
              success: true,
              message: "Booking archived successfully",
            }); // Resolve with success message
          }
        });
      } catch (error) {
        console.error("Error archiving booking:", error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  }

  static uploadProofOfDelivery(bookingID, proofOfDelivery) {
    return new Promise((resolve, reject) => {
      console.log("Booking ID Model:", bookingID);
      console.log("Proof of Delivery Model:", proofOfDelivery);

      // Extract the filename from the proofOfDelivery object
      const proofFileName = proofOfDelivery[0].filename;
      console.log("File Name:", proofFileName);

      db.query(
        "UPDATE booking_tbl SET ProofOfDelivery = ? WHERE BookingID = ?",
        [proofFileName, bookingID],
        (err, result) => {
          if (err) {
            console.error("Error updating proof of delivery:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static customerComplaint(
    userID,
    trackingNumber,
    typeOfComplaint,
    complaintDescription,
    proofAttachment,
    complaintDate
  ) {
    return new Promise((resolve, reject) => {
      // Query to retrieve CustomerID based on UserID
      console.log("Executing query to retrieve CustomerID for UserID:", userID);
      db.query(
        "SELECT CustomerID FROM customer_tbl WHERE UserID = ?",
        [userID],
        (err, customerResults) => {
          if (err) {
            console.error("Error retrieving CustomerID:", err);
            reject(err);
          } else {
            if (customerResults.length > 0) {
              const customerID = customerResults[0].CustomerID;
              // Query to retrieve BookingID based on TrackingNumber
              console.log(
                "Executing query to retrieve BookingID for TrackingNumber:",
                trackingNumber
              );
              db.query(
                "SELECT BookingID FROM booking_tbl WHERE TrackingNumber = ?",
                [trackingNumber],
                (err, bookingResults) => {
                  if (err) {
                    console.error("Error retrieving BookingID:", err);
                    reject(err);
                  } else {
                    if (bookingResults.length > 0) {
                      const bookingID = bookingResults[0].BookingID;
                      // Once CustomerID and BookingID are retrieved, insert complaint details
                      db.query(
                        "INSERT INTO complaint_tbl (CustomerID, BookingID, TrackingNumber, TypeOfComplaint, ComplaintDescription, ProofAttachment, ComplaintDate, ComplaintStatus) VALUES (?,?,?,?,?,?,?,?)",
                        [
                          customerID,
                          bookingID,
                          trackingNumber,
                          typeOfComplaint,
                          complaintDescription,
                          proofAttachment,
                          complaintDate,
                          "Pending",
                        ],
                        (err, result) => {
                          if (err) {
                            console.error(
                              "Error inserting complaint details:",
                              err
                            );
                            reject(err);
                          } else {
                            resolve(result.insertId);
                          }
                        }
                      );
                    } else {
                      reject(
                        "No booking found for the provided TrackingNumber"
                      );
                    }
                  }
                }
              );
            } else {
              reject("Customer not found for the provided UserID");
            }
          }
        }
      );
    });
  }

  static async getBookings() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
        booking_tbl.BookingID,
        booking_tbl.TrackingNumber,
        booking_tbl.BookingStatus,
        booking_tbl.BookingDate,
        booking_tbl.ParcelOrigin,
        booking_tbl.ParcelDestination,
        booking_tbl.VehicleType,
        booking_tbl.ProofOfDelivery,
        booking_tbl.TotalPrice,
        CONCAT(customer_tbl.FirstName, ' ', customer_tbl.LastName) AS Name,
        CONCAT(driver_tbl.FirstName, ' ', driver_tbl.LastName) AS AssignedDriver
    FROM 
        booking_tbl
    LEFT JOIN 
        customer_tbl ON booking_tbl.CustomerID = customer_tbl.CustomerID
    LEFT JOIN 
        driver_tbl ON booking_tbl.AssignedDriver = driver_tbl.DriverID
    ORDER BY 
        booking_tbl.BookingID DESC;
    `;

      console.log("Executing query to fetch bookings...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching bookings:", err);
          reject(err);
        } else {
          console.log("Successfully fetched bookings.");
          resolve(results);
        }
      });
    });
  }

  static async restoreComplaint(complaintID) {
    return new Promise((resolve, reject) => {
      try {
        const query = `
        UPDATE parcel_complaint_tbl
        SET RecordStatus = "Active"
        WHERE ComplaintID = ?;
      `;
        // Execute the query with the bookingID
        db.query(query, [complaintID], (error, results) => {
          if (error) {
            console.error("Error restoring complaint:", error);
            reject(error); // Reject the Promise if there's an error
          } else {
            resolve({
              success: true,
              message: "Complaint restored successfully",
            }); // Resolve with success message
          }
        });
      } catch (error) {
        console.error("Error archiving complaint:", error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  }

  static async archiveBookingData(bookingID) {
    return new Promise((resolve, reject) => {
      try {
        const selectQuery = `
      SELECT
      b.BookingID,
      c.CustomerID,
      b.TrackingNumber,
      r.ReceiverName,
      b.ParcelDestination,
      s.SenderName,
      b.ParcelOrigin,
      b.VehicleType,
      b.BookingDate,
      b.BookingStatus,
      b.AssignedDriver,
      b.TotalPrice,
      b.ProofOfDelivery
    FROM
      booking_tbl b
    JOIN
      customer_tbl c ON b.CustomerID = c.CustomerID
    LEFT JOIN 
      receiver_tbl r ON b.BookingID = r.BookingID
    LEFT JOIN
      sender_tbl s ON b.BookingID = s.BookingID
    WHERE
      b.BookingID = ?;      
    `;

        const insertBookingQuery = `
      INSERT INTO archived_booking_tbl (
        BookingID,
        CustomerID,
        TrackingNumber,
        ReceiverName,
        ParcelDestination,
        SenderName,
        ParcelOrigin,
        VehicleType,
        BookingDate,
        BookingStatus,
        AssignedDriver,
        TotalPrice,
        ProofOfDelivery
      )
      SELECT
        b.BookingID,
        c.CustomerID,
        b.TrackingNumber,
        r.ReceiverName,
        b.ParcelDestination,
        s.SenderName,
        b.ParcelOrigin,
        b.VehicleType,
        b.BookingDate,
        b.BookingStatus,
        b.AssignedDriver,
        b.TotalPrice,
        b.ProofOfDelivery
      FROM
        booking_tbl b
      JOIN
        customer_tbl c ON b.CustomerID = c.CustomerID
      JOIN 
        receiver_tbl r ON b.BookingID = r.BookingID
      JOIN
        sender_tbl s ON b.BookingID = s.BookingID
      WHERE
        b.BookingID = ?;
    `;

        const deleteBookingQuery = `
      DELETE FROM booking_tbl WHERE BookingID = ?;
    `;

        // Execute the select query to fetch booking details
        db.query(selectQuery, [bookingID], (error, results) => {
          if (error) {
            console.error("Error fetching booking details:", error);
            reject(error); // Reject the Promise if there's an error
            return;
          }

          const bookingDetails = results[0]; // Assuming only one row will be returned

          // Execute the insert query to archive booking details
          db.query(insertBookingQuery, [bookingID], (error, insertResult) => {
            if (error) {
              console.error("Error archiving booking:", error);
              reject(error); // Reject the Promise if there's an error
            } else {
              // Execute the delete query to remove booking from the original table
              db.query(
                deleteBookingQuery,
                [bookingID],
                (error, deleteResult) => {
                  if (error) {
                    console.error("Error deleting booking:", error);
                    reject(error); // Reject the Promise if there's an error
                  } else {
                    resolve({
                      success: true,
                      message: "Booking archived successfully",
                      archivedBookingData: bookingDetails,
                    }); // Resolve with success message and archived booking details
                  }
                }
              );
            }
          });
        });
      } catch (error) {
        console.error("Error archiving booking:", error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  }
}

export default BookingModel;

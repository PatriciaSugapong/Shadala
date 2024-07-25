import db from "../config/db.js";

class ComplaintModel {
  static async archiveComplaints(complaintID) {
    return new Promise((resolve, reject) => {
      try {
        const selectQuery = `
            SELECT
            ComplaintID,
            BookingID,
            CONCAT(customer_tbl.FirstName, ' ', customer_tbl.LastName) AS Name,
            TrackingNumber,
            TypeOfComplaint AS ComplaintType,
            ProofAttachment AS Attachment,
            complaintDate AS DateFiled,
            complaintDescription AS Description   
        FROM
            complaint_tbl
        JOIN
            customer_tbl ON complaint_tbl.CustomerID = customer_tbl.CustomerID
        WHERE
            ComplaintID = ?;
    
            `;

        const insertQuery = `
              INSERT INTO archived_complaint_tbl (
                ComplaintID,
                BookingID,
                Name,
                TrackingNumber,
                TypeOfComplaint,
                ProofAttachment,
                ComplaintDate,
                ComplaintDescription
              ) ${selectQuery};
            `;

        const deleteQuery = `
              DELETE FROM complaint_tbl WHERE ComplaintID = ?;
            `;

        // Execute the select query to fetch complaint details
        db.query(selectQuery, [complaintID], (error, results) => {
          if (error) {
            console.error("Error fetching complaint details:", error);
            reject(error); // Reject the Promise if there's an error
            return;
          }

          // Execute the insert query to archive complaint details
          db.query(insertQuery, [complaintID], (error, insertResult) => {
            if (error) {
              console.error("Error archiving complaints:", error);
              reject(error); // Reject the Promise if there's an error
            } else {
              console.log("Successfully archived complaints.");

              // Once complaint is archived, delete it from parcel_complaint_tbl
              db.query(
                deleteQuery,
                [complaintID],
                (deleteError, deleteResult) => {
                  if (deleteError) {
                    console.error("Error deleting complaint:", deleteError);
                    reject(deleteError); // Reject the Promise if there's an error
                  } else {
                    console.log(
                      "Successfully deleted complaint from complaint_tbl."
                    );
                    resolve(insertResult);
                  }
                }
              );
            }
          });
        });
      } catch (error) {
        console.error("Error archiving complaints:", error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  }

  static async getComplaint() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
    complaint_tbl.ComplaintID,
    complaint_tbl.TrackingNumber,
    complaint_tbl.Feedback,
    complaint_tbl.ComplaintStatus,
    complaint_tbl.complaintDate AS DateFiled,  
      CONCAT(customer_tbl.FirstName, ' ', customer_tbl.LastName) AS Name,
    complaint_tbl.typeOfComplaint AS ComplaintType,
      complaint_tbl.complaintDescription AS Description,
      complaint_tbl.proofAttachment AS Attachment
    FROM 
      complaint_tbl
    INNER JOIN 
      customer_tbl ON complaint_tbl.CustomerID = customer_tbl.CustomerID;

    `;

      console.log("Executing query to fetch complaint...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching complaint", err);
          reject(err);
        } else {
          console.log("Successfully fetched complaint.");
          resolve(results);
        }
      });
    });
  }

  static async getComplaintsByCustomerID(userID) {
    return new Promise((resolve, reject) => {
      // Retrieve customer ID based on the provided user ID
      const getCustomerIDQuery = `
            SELECT CustomerID FROM customer_tbl WHERE UserID = ?;
        `;

      db.query(getCustomerIDQuery, [userID], (err, results) => {
        if (err) {
          console.error("Error fetching customer ID", err);
          reject(err);
        } else {
          // Check if a customer ID is found
          if (results.length === 0) {
            console.error("Customer ID not found for the provided user ID");
            reject(new Error("Customer ID not found"));
            return;
          }

          // Extract the customer ID from the results
          const customerID = results[0].CustomerID;

          // Query to fetch complaints using the retrieved customer ID
          const getComplaintsQuery = `
                    SELECT 
                        complaint_tbl.ComplaintID,
                        complaint_tbl.TrackingNumber,
                        complaint_tbl.Feedback,
                        complaint_tbl.ComplaintStatus,
                        complaint_tbl.complaintDate AS DateFiled,  
                        CONCAT(customer_tbl.FirstName, ' ', customer_tbl.LastName) AS Name,
                        complaint_tbl.typeOfComplaint AS ComplaintType,
                        complaint_tbl.complaintDescription AS Description,
                        complaint_tbl.proofAttachment AS Attachment
                    FROM 
                        complaint_tbl
                    INNER JOIN 
                        customer_tbl ON complaint_tbl.CustomerID = customer_tbl.CustomerID
                    WHERE 
                        complaint_tbl.CustomerID = ?;
                `;

          console.log("Executing query to fetch complaint...");
          db.query(getComplaintsQuery, [customerID], (err, results) => {
            if (err) {
              console.error("Error fetching complaint", err);
              reject(err);
            } else {
              console.log("Successfully fetched complaint.");
              resolve(results);
            }
          });
        }
      });
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
  static async updateFeedback(complaintId, feedback, status) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE complaint_tbl
        SET ComplaintStatus = ?, Feedback = ?
        WHERE ComplaintID = ?
      `;
      const values = [status, feedback, complaintId];

      db.query(sql, values, (error, results) => {
        if (error) {
          console.error("Error updating complaint feedback:", error);
          reject(error);
        } else {
          console.log("Complaint feedback updated successfully");
          resolve(results.affectedRows > 0);
        }
      });
    });
  }

  static async countPendingComplaints() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          COUNT(*) AS pendingCount
        FROM 
          complaint_tbl
        WHERE 
          complaint_tbl.ComplaintStatus = 'Pending';
      `;

      console.log("Executing query to fetch pending complaints...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching pending complaints:", err);
          reject(err);
        } else {
          console.log("Successfully fetched pending complaints.");
          // Extract the count from the results
          const pendingCount =
            results && results.length > 0 ? results[0].pendingCount : 0;
          resolve(pendingCount);
        }
      });
    });
  }

  static async countComplaints() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          COUNT(*) AS ComplaintCount
        FROM 
          complaint_tbl
      `;

      console.log("Executing query to fetch complaints...");
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching complaints:", err);
          reject(err);
        } else {
          console.log("Successfully fetched complaints.");
          // Extract the count from the results
          const ComplaintCount =
            results && results.length > 0 ? results[0].ComplaintCount : 0;
          resolve(ComplaintCount);
        }
      });
    });
  }
}

export default ComplaintModel;

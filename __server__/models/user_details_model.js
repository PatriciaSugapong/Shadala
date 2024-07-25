import db from "../config/db.js";
import bcrypt from "bcrypt";

class UserDetailsModel {
  static add(email, password, accountTypeId) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(
        "INSERT INTO user_details_tbl (AccountTypeID, EmailAddress, Password) VALUES (?, ?, ?)",
        [accountTypeId, email, hashedPassword],
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

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(
        `
      SELECT 
  user_details_tbl.*, 
  customer_tbl.FirstName AS CustomerFirstName, 
  customer_tbl.LastName AS CustomerLastName, 
  driver_tbl.FirstName AS DriverFirstName, 
  driver_tbl.LastName AS DriverLastName, 
  admin_tbl.FirstName AS AdminFirstName, 
  admin_tbl.LastName AS AdminLastName, 
  account_type_tbl.AccountType
FROM 
  user_details_tbl
LEFT JOIN 
  customer_tbl ON user_details_tbl.UserID = customer_tbl.UserID
LEFT JOIN 
  driver_tbl ON user_details_tbl.UserID = driver_tbl.UserID
LEFT JOIN 
  admin_tbl ON user_details_tbl.UserID = admin_tbl.UserID
JOIN 
  account_type_tbl ON user_details_tbl.AccountTypeID = account_type_tbl.AccountTypeID
ORDER BY 
  user_details_tbl.UserID DESC

      `,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  
  
  static async archiveUsers(userID) {
    return new Promise((resolve, reject) => {
      try {
        const selectQuery = `
        SELECT
            user_details_tbl.UserID,
            user_details_tbl.EmailAddress,
            user_details_tbl.Password,
            user_details_tbl.DateCreated,
            CASE
                WHEN customer_tbl.UserID IS NOT NULL THEN 'Customer'
                WHEN driver_tbl.UserID IS NOT NULL THEN 'Driver'
                WHEN admin_tbl.UserID IS NOT NULL THEN 'Admin'
                ELSE NULL
            END AS AccountType,
            CASE
                WHEN customer_tbl.UserID IS NOT NULL THEN customer_tbl.FirstName
                WHEN driver_tbl.UserID IS NOT NULL THEN driver_tbl.FirstName
                WHEN admin_tbl.UserID IS NOT NULL THEN admin_tbl.FirstName
                ELSE NULL
            END AS FirstName,
            CASE
                WHEN customer_tbl.UserID IS NOT NULL THEN customer_tbl.LastName
                WHEN driver_tbl.UserID IS NOT NULL THEN driver_tbl.LastName
                WHEN admin_tbl.UserID IS NOT NULL THEN admin_tbl.LastName
                ELSE NULL
            END AS LastName
        FROM
            user_details_tbl
        LEFT JOIN
            customer_tbl ON user_details_tbl.UserID = customer_tbl.UserID
        LEFT JOIN
            driver_tbl ON user_details_tbl.UserID = driver_tbl.UserID
        LEFT JOIN
            admin_tbl ON user_details_tbl.UserID = admin_tbl.UserID
        WHERE
            user_details_tbl.UserID = ?;
    `;

        const insertUserQuery = `
        INSERT INTO archived_users_tbl (
            UserID,
            EmailAddress,
            Password,
            DateCreated,
            AccountType,
            FirstName,
            LastName
        )
        ${selectQuery};
    `;

        const deleteUserQuery = `
        DELETE user_details_tbl, customer_tbl, driver_tbl, admin_tbl
        FROM user_details_tbl
        LEFT JOIN customer_tbl ON user_details_tbl.UserID = customer_tbl.UserID
        LEFT JOIN driver_tbl ON user_details_tbl.UserID = driver_tbl.UserID
        LEFT JOIN admin_tbl ON user_details_tbl.UserID = admin_tbl.UserID
        WHERE user_details_tbl.UserID = ?;
    `;

        // Execute the select query to fetch user details
        db.query(selectQuery, [userID], (error, results) => {
          if (error) {
            console.error("Error fetching user details:", error);
            reject(error); // Reject the Promise if there's an error
            return;
          }

          const userDetails = results[0]; // Assuming only one row will be returned

          // Execute the insert query to archive user details
          db.query(insertUserQuery, [userID], (error, insertUserResult) => {
            if (error) {
              console.error("Error archiving user:", error);
              reject(error); // Reject the Promise if there's an error
            } else {
              // Execute the delete query to remove user from the original table
              db.query(deleteUserQuery, [userID], (error, deleteUserResult) => {
                if (error) {
                  console.error("Error deleting user:", error);
                  reject(error); // Reject the Promise if there's an error
                } else {
                  resolve({
                    success: true,
                    message: "User archived successfully",
                    archivedUserData: userDetails,
                  }); // Resolve with success message and archived user details
                }
              });
            }
          });
        });
      } catch (error) {
        console.error("Error archiving user:", error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  }


  // Add other methods as needed for CRUD operations on the user_details table
}

export default UserDetailsModel;

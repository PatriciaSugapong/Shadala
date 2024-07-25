// customerModel.js
import db from "../config/db.js";

class CustomerModel {
  static add(userID, firstName, lastName, homeAddress, contactNumber) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO customer_tbl (UserID, FirstName, LastName, HomeAddress, ContactNumber) VALUES (?, ?, ?, ?, ?)",
        [userID, firstName, lastName, homeAddress, contactNumber],
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

  // Add other methods as needed for CRUD operations on the customer table
}

export default CustomerModel;

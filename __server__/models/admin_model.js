// adminModel.js
import db from "../config/db.js";

class AdminModel {
  static add(userID, firstName, lastName) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO admin_tbl (UserID, FirstName, LastName) VALUES (?, ?, ?)",
        [userID, firstName, lastName],
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
}

export default AdminModel;

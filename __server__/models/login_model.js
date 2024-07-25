import bcrypt from "bcrypt";
import db from "../config/db.js";

class loginUser {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM user_details_tbl WHERE EmailAddress = ?";
      db.query(query, [email], (error, rows) => {
        if (error) {
          reject(error);
        } else {
          console.log("User found:", rows[0]); // Log the retrieved user object
          if (rows.length > 0) {
            resolve(rows[0]);
          } else {
            resolve(null); // Resolve with null if no user is found
          }
        }
      });
    });
  }

  static async verifyPassword(user, password) {
    console.log("User:", user); // Log the user object
    // Extract the hashed password from the user object
    const hashedPassword = user.Password;
    console.log("Hashed Password:", hashedPassword); // Log the hashed password

    try {
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      return passwordMatch;
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  }
}

export default loginUser;

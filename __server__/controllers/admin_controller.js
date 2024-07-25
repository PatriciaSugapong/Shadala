// customerController.js
import AdminModel from "../models/admin_model.js";
import UserDetailsModel from "../models/user_details_model.js";

class AdminController {
  static async signUp(req, res) {
    try {
      // Extract customer data from the request body
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;

      // Add user details to the user_details table
      const userID = await UserDetailsModel.add(email, password, 1); // Assuming AccountTypeID 1 is for Admins

      // Add customer details to the customer table
      await AdminModel.add(
        userID,
        firstName,
        lastName,
    );

      // Respond with success message
      res.status(201).json({ message: "Admin signed up successfully" });
    } catch (error) {
      // Handle errors
      console.error("Error signing up customer:", error);
      res
        .status(500)
        .json({ error: "An error occurred while signing up admin" });
    }
  }
}

export default AdminController;

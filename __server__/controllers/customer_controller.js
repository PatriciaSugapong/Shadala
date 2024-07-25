// customerController.js
import CustomerModel from "../models/customer_model.js";
import UserDetailsModel from "../models/user_details_model.js";
import db from "../config/db.js";

class CustomerController {
  static async signUp(req, res) {
    try {
      // Extract customer data from the request body
      const {
        firstName,
        lastName,
        homeAddress,
        contactNumber,
        email,
        password,
      } = req.body;

      // Add user details to the user_details table
      const userID = await UserDetailsModel.add(email, password, 2); // Assuming AccountTypeID 2 is for Customers

      // Add customer details to the customer table
      await CustomerModel.add(
        userID,
        firstName,
        lastName,
        homeAddress,
        contactNumber
      );

      // Respond with success message
      res.status(201).json({ message: "Customer signed up successfully" });
    } catch (error) {
      // Handle errors
      console.error("Error signing up customer:", error);
      res
        .status(500)
        .json({ error: "An error occurred while signing up customer" });
    }
  }

  static async test(req, res) {
    console.log("Route working");
    res.status(200).json({ message: "Route working" });
  }

  // Add other controller methods as needed
}

export default CustomerController;

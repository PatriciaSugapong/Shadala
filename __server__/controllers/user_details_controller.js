// userDetailsController.js
import UserDetailsModel from "../models/user_details_model.js"; // Corrected import statement

class UserDetailsController {
  static async addUserDetails(req, res) {
    try {
      const { email, password } = req.body;
      const dateCreated = new Date().toISOString(); // Get current date and time

      await UserDetailsModel.add(email, password, dateCreated);

      res.status(201).json({ message: "User details added successfully" });
    } catch (error) {
      console.error("Error in addUserDetails:", error);
      res
        .status(500)
        .json({ error: "An error occurred while adding user details" });
    }
  }

  static async getUserDetails(req, res) {
    try {
      const users = await UserDetailsModel.getAll(); // Implement this method in your UserDetailsModel
      res.json(users);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async restoreUser(req, res) {
    const { userID } = req.body;
    console.log("Received userID:", userID);

    try {
      const result = await UserDetailsModel.restoreUser(userID);
      console.log("User restored successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error restoring user:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to restore user" });
    }
  }

  static async archiveUser(req, res) {
    const { userID } = req.body;
    console.log("Received userID:", userID);

    try {
      // Call the archiveUsers method from the UserDetailsModel
      const result = await UserDetailsModel.archiveUsers(userID);
      console.log("User archived successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error archiving user:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to archive user" });
    }
  }
  // Add other controller methods as needed
}

export default UserDetailsController;

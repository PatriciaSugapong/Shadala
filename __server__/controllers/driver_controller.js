// driverController.js
import DriverModel from "../models/driver_model.js";
import UserDetailsModel from "../models/user_details_model.js";
import VehicleModel from "../models/vehicle_model.js";

class DriverController {
  static async signUp(req, res) {
    try {
      // Extract driver data from the request body
      const {
        firstName,
        lastName,
        homeAddress,
        contactNumber,
        email,
        password,
        licenseNumber,
        expirationDate,
        vehicleModel,
      plateNumber,
      vehicleType,
      vehicleColor,
    } = req.body;

    // Extract file names from the req.files object
    const vpdlImage = req.files["vpdlImage"]
      ? req.files["vpdlImage"][0].filename
      : null;
    const certRegImage = req.files["certRegImage"]
      ? req.files["certRegImage"][0].filename
      : null;
    const ORImage = req.files["ORImage"]
      ? req.files["ORImage"][0].filename
      : null;

    // Add user details to the user_details table
    const userID = await UserDetailsModel.add(email, password, 3);

    // Add vehicle details to the vehicle table
    const vehicleID = await VehicleModel.add(
      null, // Pass null for driverID since we don't have it yet
      vehicleModel,
      plateNumber,
      vehicleType,
      vehicleColor,
      vpdlImage,
      certRegImage,
      ORImage
    );

    // Add driver details to the driver table
    const driverID = await DriverModel.add(
      userID,
      vehicleID, // Pass the vehicleID here
      firstName,
      lastName,
      homeAddress,
      contactNumber,
      licenseNumber,
      expirationDate,
      "Newly Registered"
    );

    await DriverModel.updateDriverID(driverID, vehicleID);

    // Respond with success message
    res.status(201).json({ message: "Driver signed up successfully" });
  } catch (error) {
    console.error("Error signing up driver:", error);
    res.status(500).json({ error: "An error occurred while signing up driver" });
  }
};



  static async getDriverDetails(req, res) {
    try {
      const drivers = await DriverModel.getAll();
      res.json(drivers);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async editDriverInfo(req, res) {
    try {
      const { firstName, lastName, homeAddress, vehicleType, plateNumber, vehicleColor, vehicleModel } = req.body;
      const driverID = req.params.DriverID; // Extract driverID from URL params
  
      // Call the edit function from the model to update driver and vehicle information
      const updateDriverInfo = await DriverModel.editDriverInfo(driverID, firstName, lastName, homeAddress, vehicleType, plateNumber, vehicleColor, vehicleModel);
  
      // Send a success response with the result of the update
      res.status(200).json({ success: true, message: 'Driver and vehicle information updated successfully', updateDriverInfo });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error updating driver and vehicle information:', error);
      res.status(500).json({ success: false, message: 'An error occurred while updating driver and vehicle information' });
    }
  }
  
  

  static async getDriverProfile(req, res) {
    try {
      // Extract userID from query parameter
      const userID = req.query.userID;

      // Fetch booking details based on userID
      const driverProfile = await DriverModel.getDriverProfile(userID);

      // Send the booking history as a response
      res.json(driverProfile);
    } catch (error) {
      console.error("Error fetching driver profile:", error);
      res.status(500).json({ error: "Failed to fetch driver profile" });
    }
  }

  static async getDriverHistory(req, res) {
    try {
      // Extract userID from query parameter
      const userID = req.query.userID;

      // Fetch driver's history based on userID
      const driverHistory = await DriverModel.getDriverHistory(userID);

      // Send the driver's history as a response
      res.json(driverHistory);
    } catch (error) {
      console.error("Error fetching driver history:", error);
      res.status(500).json({ error: "Failed to fetch driver history" });
    }
  }

  // Function to update driver status
  static async toggleStatus(req, res) {
    try {
      const { userID, status } = req.body; // Extract userID and status from request body

      // Call the toggleStatus function with the provided userID and status
      const result = await DriverModel.toggleStatus(userID, status);

      // Send success response
      res.json({ message: "Driver status updated successfully", result });
    } catch (error) {
      console.error("Error updating driver status:", error);
      // Send error response
      res.status(500).json({ error: "Failed to update driver status" });
    }
  }

  static async archiveDriver(req, res) {
    const { driverID } = req.body;
    console.log("Received driverID:", driverID);

    try {
      // Call the archiveBooking method from the Booking model
      const result = await DriverModel.archiveDriver(driverID);
      console.log("Driver archived successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error archiving driver:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to archive drivers" });
    }
  }

  static async restoreDriver(req, res) {
    const { driverID } = req.body;
    console.log("Received driverID:", driverID);

    try {
      const result = await DriverModel.restoreDriver(driverID);
      console.log("Driver restored successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error restoring driver:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to restore driver" });
    }
  }

  static async archiveDriverData(req, res) {
    const { driverID } = req.body;
    console.log("Received driverID:", driverID);

    try {
      // Call the archiveDriver method from the Driver model
      const result = await DriverModel.archiveDriverData(driverID);
      console.log("Driver archived successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error archiving driver:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to archive driver" });
    }
  }
  
//   static async uploadProfilePhoto(req, res) {
//     try {
//       const userID = req.body.userID;
//       const profilePhoto = req.file;

//       if (!userID || !profilePhoto) {
//           return res.status(400).json({ error: "userID and profilePhoto are required" });
//       }

//       const result = await DriverModel.uploadProfilePhoto(userID, profilePhoto);

//       console.log("Profile photo uploaded successfully.");

//       res.status(201).json({ message: "Profile Photo uploaded successfully", result });
//   } catch (error) {
//       console.error("Error uploading profile photo:", error);
//       res.status(500).json({ error: "An error occurred while uploading profile photo" });
//   }
// }
static async countAvailableDrivers (req, res){
  try {
      // Call the countPendingBookings function to get the count of pending bookings
      const AvailableDriversCount = await DriverModel.countAvailableDrivers();

      // Send the count as a response
      res.status(200).json({ AvailableDriversCount });
  } catch (error) {
      // Handle errors
      console.error("Error getting completed bookings count:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};



}

export default DriverController;

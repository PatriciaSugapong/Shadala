import BookingModel from "../models/booking_model.js";

class BookingController {
  static addBooking = async (req, res) => {
    try {
      // Extract data from request body
      const {
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
        totalPrice,
      } = req.body;

      // Call the model function to add booking details
      const result = await BookingModel.addBookingDetails(
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
      );

      // Respond with success message
      res
        .status(200)
        .json({ message: "Booking details added successfully", data: result });
    } catch (error) {
      // Respond with error message
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  };

  static async getParcelInfo(req, res) {
    try {
      const { trackingNumber } = req.query;

      // Fetch booking details based on userID
      const parcelInfo = await BookingModel.getParcelInfo(trackingNumber);

      // Send the booking history as a response
      res.json(parcelInfo);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      res.status(500).json({ error: "Failed to fetch booking history" });
    }
  }

  static async getBookingHistory(req, res) {
    try {
      // Extract userID from query parameter
      const userID = req.query.userID;

      // Fetch booking details based on userID
      const bookingHistory = await BookingModel.getBookingHistoryDetails(
        userID
      );

      // Send the booking history as a response
      res.json(bookingHistory);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      res.status(500).json({ error: "Failed to fetch booking history" });
    }
  }
  static async cancelBooking(req, res) {
    try {
      // Extract bookingID from query parameter or request body
      const bookingID = req.query.bookingID || req.body.bookingID;

      // Cancel the booking based on the bookingID
      const cancelResult = await BookingModel.cancelBooking(bookingID);

      // Check if the booking was successfully cancelled
      if (cancelResult) {
        res.status(200).json({ message: "Booking cancelled successfully" });
      } else {
        res
          .status(404)
          .json({ error: "No booking found for the provided bookingID" });
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      res.status(500).json({ error: "Failed to cancel booking" });
    }
  }

  static async getPendingBookings(req, res) {
    try {
      // Call the model method to fetch pending bookings
      const pendingBookings = await BookingModel.getPendingBookings();

      res.status(200).json(pendingBookings);
    } catch (error) {
      // Handle any errors
      console.error("Error getting pending bookings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getInTransitBookings(req, res) {
    try {
      // Call the model method to fetch pending bookings
      const inTransitBookings = await BookingModel.getInTransitBookings();

      res.status(200).json(inTransitBookings);
    } catch (error) {
      // Handle any errors
      console.error("Error getting in transit bookings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getPendingBookingsByUserID(req, res) {
    try {
      const userID = req.params.userID; // Assuming userID is passed in the request parameters
      const pendingBookingsByUserID =
        await BookingModel.getPendingBookingsByUserID(userID);

      res.status(200).json({ success: true, data: pendingBookingsByUserID });
    } catch (error) {
      // Handle any errors
      console.error("Error getting pending bookings:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  static async countPendingBookings(req, res) {
    try {
      // Call the countPendingBookings function to get the count of pending bookings
      const pendingCount = await BookingModel.countPendingBookings();

      // Send the count as a response
      res.status(200).json({ pendingCount });
    } catch (error) {
      // Handle errors
      console.error("Error getting pending bookings count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async countCompletedBookings(req, res) {
    try {
      // Call the countPendingBookings function to get the count of pending bookings
      const CompletedCount = await BookingModel.countCompletedBookings();

      // Send the count as a response
      res.status(200).json({ CompletedCount });
    } catch (error) {
      // Handle errors
      console.error("Error getting completed bookings count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateBookingStatus(req, res) {
    try {
      // Extract booking ID, user ID, and booking status from request parameters and body
      const { bookingID } = req.params;
      const { userID, bookingStatus } = req.body;

      // Call the model method to update the booking status
      const result = await BookingModel.updateBookingStatus(
        userID,
        bookingID,
        bookingStatus
      );

      // Log the result after the update operation
      console.log("Update result:", result);

      // Send success response
      res.status(200).json({ message: "Booking status updated successfully" });
    } catch (error) {
      // Handle any errors
      console.error("Error updating booking status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async archiveBooking(req, res) {
    const { bookingID } = req.body;
    console.log("Received bookingID:", bookingID);

    try {
      // Call the archiveBooking method from the Booking model
      const result = await BookingModel.archiveBooking(bookingID);
      console.log("Booking archived successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error archiving booking:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to archive booking" });
    }
  }

  static async restoreBooking(req, res) {
    const { bookingID } = req.body;
    console.log("Received bookingID:", bookingID);

    try {
      const result = await BookingModel.restoreBooking(bookingID);
      console.log("Booking restored successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error restoring booking:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to restore booking" });
    }
  }

  static async uploadProofOfDelivery(req, res) {
    try {
      const { bookingID } = req.body;
      const { proofOfDelivery } = req.files;

      console.log("Booking ID Controller:", bookingID);
      console.log("Proof of Delivery Controller:", proofOfDelivery);

      await BookingModel.uploadProofOfDelivery(bookingID, proofOfDelivery);

      res
        .status(200)
        .json({ message: "Proof of Delivery uploaded successfully" });
    } catch (error) {
      console.error("Error uploading proof of delivery:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async customerComplaint(req, res) {
    try {
      const { userID, trackingNumber, typeOfComplaint, complaintDescription } =
        req.body;

      console.log("Request body:", req.body); // Log the request body

      let proofAttachment = null;

      if (req.files && req.files["proofAttachment"]) {
        proofAttachment = req.files["proofAttachment"][0].filename;
      }

      const complaintDate = new Date().toISOString();

      // Add Complaint details to the parcel_complaint_tbl
      await BookingModel.customerComplaint(
        userID,
        trackingNumber,
        typeOfComplaint,
        complaintDescription,
        proofAttachment,
        complaintDate
      );

      // Respond with success message
      res.status(201).json({ message: "Complaint submitted successfully" });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting complaint" });
    }
  }

  static async getBookings(req, res) {
    try {
      // Call the model method to fetch pending bookings
      const Bookings = await BookingModel.getBookings();
      res.status(200).json(Bookings);
    } catch (error) {
      // Handle any errors
      console.error("Error getting bookings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getComplaint(req, res) {
    try {
      // Call the model method to fetch pending bookings
      const complaints = await BookingModel.getComplaint();
      res.status(200).json(complaints);
    } catch (error) {
      // Handle any errors
      console.error("Error getting bookings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async archiveComplaint(req, res) {
    const { complaintID } = req.body;
    console.log("Received complaintID:", complaintID);

    try {
      // Call the archiveBooking method from the Booking model
      const result = await BookingModel.archiveComplaint(complaintID);
      console.log("Complaint archived successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error archiving complaint:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to archive complaint" });
    }
  }

  static async restoreComplaint(req, res) {
    const { complaintID } = req.body;
    console.log("Received complaintID:", complaintID);

    try {
      const result = await BookingModel.restoreComplaint(complaintID);
      console.log("Complaint restored successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error restoring complaint:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to restore complaint" });
    }
  }

  static async getWeeklyRevenue(req, res) {
    try {
      const weeklyRevenue = await BookingModel.calculateWeeklyRevenue();
      res.status(200).json(weeklyRevenue);
    } catch (error) {
      console.error("Error fetching weekly revenue:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching weekly revenue" });
    }
  }

  static async archiveBookingData(req, res) {
    const { bookingID } = req.body; // Verify if bookingID is received in the request body
    console.log("Received bookingID:", bookingID);

    try {
      // Call the archiveBookingData method from the Booking model
      const result = await BookingModel.archiveBookingData(bookingID);
      console.log("Booking archived successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error archiving booking:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to archive booking" });
    }
  }
}

export default BookingController;

import ComplaintModel from "../models/complaint_model.js";

class ComplaintController {
  static async archiveComplaints(req, res) {
    const { complaintID } = req.body;
    console.log("Received complaintID:", complaintID);

    try {
      // Call the archiveComplaints method from the Complaint model
      const result = await ComplaintModel.archiveComplaints(complaintID);
      console.log("Complaint archived successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error archiving complaint:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to archive complaint" });
    }
  }

  static async getComplaintsByCustomerID (req, res) {
    const { userID } = req.query;
  
    try {
      console.log("Received request to fetch complaints for userID:", userID);
  
      const complaints = await ComplaintModel.getComplaintsByCustomerID(userID);
      console.log("Successfully fetched complaints:", complaints);
      res.json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error.message || error);
      res.status(500).json({ error: "Failed to fetch complaints" });
    }
  };
  
  static async getComplaint(req, res) {
    try {
      // Call the model method to fetch pending bookings
      const complaints = await ComplaintModel.getComplaint();
      res.status(200).json(complaints);
    } catch (error) {
      // Handle any errors
      console.error("Error getting bookings:", error);
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
      await ComplaintModel.customerComplaint(
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

    static async submitFeedback(req, res) {
      try {
        const { complaintId, feedback, status } = req.body;
  
        // Update complaint status and feedback in the database
        const updatedComplaint = await ComplaintModel.updateFeedback(complaintId, feedback, status);
  
        if (!updatedComplaint) {
          return res.status(404).json({ error: 'Complaint not found' });
        }
  
        return res.status(200).json({ message: 'Feedback submitted successfully' });
      } catch (error) {
        console.error('Error submitting feedback:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    static async countPendingComplaints (req, res){
      try {
          // Call the countPendingBookings function to get the count of pending bookings
          const pendingComplaintCount = await ComplaintModel.countPendingComplaints();
    
          // Send the count as a response
          res.status(200).json({ pendingComplaintCount });
      } catch (error) {
          // Handle errors
          console.error("Error getting pending complaints count:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
    };

    static async countComplaints (req, res){
      try {
          // Call the countPendingBookings function to get the count of pending bookings
          const ComplaintCount = await ComplaintModel.countComplaints();
    
          // Send the count as a response
          res.status(200).json({ ComplaintCount });
      } catch (error) {
          // Handle errors
          console.error("Error getting complaints count:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
    };
    
  // Add other controller methods for CRUD operations on the complaint table as needed
}

export default ComplaintController;

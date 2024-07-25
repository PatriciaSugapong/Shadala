import express from "express";
import ComplaintController from "../controllers/complaint_controller.js";

const complaint_router = express.Router();

complaint_router.post("/archive", ComplaintController.archiveComplaints);
complaint_router.get("/getComplaint", ComplaintController.getComplaint);
complaint_router.get("/getComplaintsByCustomerID", ComplaintController.getComplaintsByCustomerID);

complaint_router.post("/", ComplaintController.customerComplaint);
complaint_router.put('/complaintFeedback', ComplaintController.submitFeedback);
complaint_router.get("/countPendingComplaints", ComplaintController.countPendingComplaints);
complaint_router.get("/countComplaints", ComplaintController.countComplaints);

export default complaint_router;

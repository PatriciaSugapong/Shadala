import express from "express";
import BookingController from "../controllers/booking_controller.js";

const booking_router = express.Router();

// POST route to create a new booking
booking_router.post("/book", BookingController.addBooking);

// GET route to fetch booking details
booking_router.get("/bookingDetails", BookingController.getBookingHistory);

booking_router.put("/cancelBooking", BookingController.cancelBooking);

// GET route to fetch pending bookings
booking_router.get("/pending", BookingController.getPendingBookings);
booking_router.get("/inTransit", BookingController.getInTransitBookings);
booking_router.get(
  "/limitBooking/:userID",
  BookingController.getPendingBookingsByUserID
);

booking_router.get(
  "/countPendingBookings",
  BookingController.countPendingBookings
);
booking_router.get(
  "/countCompletedBookings",
  BookingController.countCompletedBookings
);

// POST route to update booking status
booking_router.put(
  "/updateBookingStatus/:bookingID",
  BookingController.updateBookingStatus
);
booking_router.get("/weekly-revenue", BookingController.getWeeklyRevenue);

booking_router.put("/", BookingController.uploadProofOfDelivery);

// Post route to add customer complaint
booking_router.post("/", BookingController.customerComplaint);

booking_router.get("/getBookings", BookingController.getBookings);

booking_router.post(
  "/archiveBookingData",
  BookingController.archiveBookingData
);

booking_router.put("/restoreBooking", BookingController.restoreBooking);

booking_router.get("/getParcelInfo", BookingController.getParcelInfo);

booking_router.get("/getComplaint", BookingController.getComplaint);
booking_router.put("/archiveComplaint", BookingController.archiveComplaint);
booking_router.put("/restoreComplaint", BookingController.restoreComplaint);

export default booking_router;

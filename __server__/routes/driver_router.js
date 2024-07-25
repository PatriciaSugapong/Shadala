import express from "express";
import DriverController from "../controllers/driver_controller.js";

const router = express.Router();

// Route for driver sign-up
router.post("/", DriverController.signUp);
router.put("/editDriverInfo/:DriverID", DriverController.editDriverInfo);
router.get("/countAvailableDrivers", DriverController.countAvailableDrivers);

// Route for retrieving driver details
router.get("/", DriverController.getDriverDetails);
// router.post("/", DriverController.uploadProfilePhoto);

router.get("/driverProfile", DriverController.getDriverProfile);
router.get("/driverHistory", DriverController.getDriverHistory);
router.post("/toggleStatus", DriverController.toggleStatus);

//router.put("/archiveDriver", DriverController.archiveDriver);
router.put("/restoreDriver", DriverController.restoreDriver);
router.post("/archiveDriverData", DriverController.archiveDriverData);
export default router;

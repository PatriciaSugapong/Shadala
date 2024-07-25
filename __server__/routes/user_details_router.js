// userDetailsRoutes.js
import express from "express";
import UserDetailsController from "../controllers/user_details_controller.js";

const router = express.Router();

// Route for adding user details
router.post("/", UserDetailsController.addUserDetails);

// Route for retrieving user details
router.get("/", UserDetailsController.getUserDetails);

router.post("/archiveUser", UserDetailsController.archiveUser);
//router.put("/restoreUser", UserDetailsController.restoreUser);

// Add other routes as needed

export default router;

import express from "express";
import ForgotPasswordController from "../controllers/forgot_password_controller.js";

const forgot_router = express.Router();

// Define route handlers
forgot_router.post('/', ForgotPasswordController.forgotPassword);
forgot_router.post('/verifycode', ForgotPasswordController.verifyCode);
forgot_router.post('/resetpassword', ForgotPasswordController.resetPassword); // New route for resetting password

export default forgot_router;

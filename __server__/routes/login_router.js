import express from "express";
import authController from "../controllers/login_controller.js";

const login_router = express.Router();
// POST /login route for user login
login_router.post("/", authController.login);

export default login_router;

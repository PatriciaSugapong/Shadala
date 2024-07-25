// adminRoutes.js
import express from 'express';
import AdminController from '../controllers/admin_controller.js';

const admin_router = express.Router();

// Route for admin sign-up
admin_router.post('/', AdminController.signUp);

export default admin_router;
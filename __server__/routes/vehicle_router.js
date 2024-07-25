// userDetailsRoutes.js
import express from 'express';
import VehicleController from '../controllers/vehicle_controller.js';

const router = express.Router();

// Route for adding Vehicle details
router.post('/', VehicleController.addVehicleDetails);

router.get('/', VehicleController.getVehicleDetails);

// Add other routes as needed

export default router;

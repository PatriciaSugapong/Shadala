// customerRoutes.js
import express from 'express';
import CustomerController from '../controllers/customer_controller.js';

const customer_router = express.Router();

// Route for customer sign-up
customer_router.post('/', CustomerController.signUp); // Change the route path to '/'

//pang Testing
customer_router.post('/', CustomerController.test);
// Add other routes as needed



export default customer_router;
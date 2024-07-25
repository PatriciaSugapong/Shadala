// vehicleController.js
import VehicleModel from '../models/vehicle_model.js';

class VehicleController {
    static async addVehicleDetails(req, res) {
        try {
            // Extract vehicle data from the request body
            const {
                vehicleModel,
                plateNumber,
                vehicleType,
                vehicleColor
            } = req.body;

            // Extract file names from the req.files object
            const vpdlImage = req.files['vpdlImage'] ? req.files['vpdlImage'][0].filename : null;
            const certRegImage = req.files['certRegImage'] ? req.files['certRegImage'][0].filename : null;
            const ORImage = req.files['ORImage'] ? req.files['ORImage'][0].filename : null;


            // Add vehicle details to the vehicle table
            await VehicleModel.add(vehicleModel, plateNumber, vehicleType, vehicleColor, vpdlImage, certRegImage, ORImage);

            res.status(201).json({ message: 'Vehicle details added successfully' });
        } catch (error) {
            console.error('Error adding vehicle details:', error);
            res.status(500).json({ error: 'An error occurred while adding vehicle details' });
        }
    }

    static async getVehicleDetails(req, res) {
        try {
            const vehicles = await VehicleModel.getAll();
            res.json(vehicles);
        } catch (error) {
            console.error('Error fetching vehicle details:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default VehicleController;

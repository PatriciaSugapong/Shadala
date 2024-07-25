// vehicleModel.js
import db from "../config/db.js";

class VehicleModel {
    static add(driverID, vehicleModel, plateNumber, vehicleType, vehicleColor, vpdlImage, certRegImage, ORImage) {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO vehicle_tbl (DriverID, VehicleModel, PlateNumber, VehicleType, VehicleColor, ValidLicenseImg, CertificateOfRegImg, OfficialReceiptImg) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [driverID, vehicleModel, plateNumber, vehicleType, vehicleColor, vpdlImage, certRegImage, ORImage],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.insertId);
                    }
                }
            );
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
          db.query("SELECT * FROM driver_tbl", (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      }
}

export default VehicleModel;

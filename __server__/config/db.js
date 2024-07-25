import customer_router from "../routes/customer_router.js";
import login_router from "../routes/login_router.js";
import user_details_router from "../routes/user_details_router.js";
import driver_router from "../routes/driver_router.js";
import vehicle_router from "../routes/vehicle_router.js";
import admin_router from "../routes/admin_router.js";
import booking_router from "../routes/booking_router.js";
import complaint_router from "../routes/complaint_router.js";
import forgot_password_router from "../routes/forgot_password_router.js";

import multer from "multer";
import express from "express";
import mysql from "mysql";
import cors from "cors";

import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
// app.use('/api', forgot_password_router)

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "shadala_clean_db",
});

app.use("/uploads", express.static("../uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory for uploads
    cb(null, "../uploads"); // Use path.join to get absolute path
  },
  filename: function (req, file, cb) {
    // Define the filename for uploaded files
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
// Assuming driver_router handles the uploadProfilePhoto route
// app.use(
//   "/drivers/uploadProfilePhoto",
//   upload.single('profilePhoto'),
//   driver_router
// );

// Route configurations
app.use("/signup/customer", customer_router);
app.use("/signup/admin", admin_router);

app.use(
  "/signup/driver",
  upload.fields([
    { name: "vpdlImage", maxCount: 1 },
    { name: "certRegImage", maxCount: 1 },
    { name: "ORImage", maxCount: 1 },
  ]),
  driver_router
);

app.use("/signin", login_router);
app.use("/users", user_details_router);
app.use("/forgot-pass", forgot_password_router);
app.use("/drivers", driver_router);
app.use("/vehicle", vehicle_router);
app.use("/bookings", booking_router);
app.use("/complaints", complaint_router);

app.use(
  "/bookings/uploadProofOfDelivery/:bookingID",
  upload.fields([{ name: "proofOfDelivery", maxCount: 1 }]),
  booking_router
);

app.use(
  "/customer/file-complaint",
  upload.fields([{ name: "proofAttachment", maxCount: 1 }]),
  complaint_router
);

app.get("/fetchRoute", async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res
      .status(400)
      .json({ error: "Start and end parameters are required" });
  }
  const apiKey = ""; // Replace with your API key
  const apiUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching route:", error.message || error);
    res.status(500).json({ error: "Failed to fetch route data" });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Backend server is running on port 3001.");
});

export default db;

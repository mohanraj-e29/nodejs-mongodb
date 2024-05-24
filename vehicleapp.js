require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const conn = process.env.CONN;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(conn)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the Vehicle schema
const vehicleSchema = new mongoose.Schema({
    registrationNumber: String,
    ownerName: String,
    vehicleType: String,
    mileage: String,
    status: String // Add this line for the vehicle status
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Route to check if a vehicle exists
app.post('/checkvehicle', async (req, res) => {
    const { registrationNumber } = req.body;
    const vehicle = await Vehicle.findOne({ registrationNumber });
    if (vehicle) {
        res.json({ exists: true, vehicle });
    } else {
        res.json({ exists: false });
    }
});

// Route to add a new vehicle
app.post('/addvehicle', async (req, res) => {
    const { registrationNumber, ownerName, vehicleType, mileage, status } = req.body;
    const newVehicle = new Vehicle({
        registrationNumber,
        ownerName,
        vehicleType,
        mileage,
        status // Add this line to handle the new status field
    });
    await newVehicle.save();
    res.json({ success: true, vehicle: newVehicle });
});

// Route to get all vehicles data
app.get("/allvehicle", async (req, res) => {
    try {
        const allVehicles = await Vehicle.find().select('registrationNumber ownerName vehicleType mileage status');
        res.json(allVehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

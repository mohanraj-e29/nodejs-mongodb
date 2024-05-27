require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const conn = process.env.CONN;
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(conn)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// MongoDB Room Schema
const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    temperature: { type: Number, required: true },
    lights: { type: Boolean, required: true },
    humidity: { type: Number, required: true }
});

const Room = mongoose.model('Room', roomSchema);

// Get details of a specific room
app.get('/rooms/:name', async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.name });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update light status of a room
app.post('/rooms/:name/lights', async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.name });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.lights = req.body.lights;
        await room.save();
        res.json({ status: 'Light status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get humidity of a room
app.get('/rooms/:name/humidity', async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.name });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ humidity: room.humidity });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update humidity of a room
app.post('/rooms/:name/humidity', async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.name });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.humidity = req.body.humidity;
        await room.save();
        res.json({ status: 'Humidity updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update temperature of a room
app.post('/rooms/:name/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.name });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.temperature = req.body.temperature;
        await room.save();
        res.json({ status: 'Temperature updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get temperature of a room
app.get('/rooms/:name/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.name });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ temperature: room.temperature });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get light status of a room
app.get('/rooms/:name/lights', async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.name });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ lights: room.lights });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get temperature of room1
app.get('/rooms/room1/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'room1' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ temperature: room.temperature });
    } catch (error) {
        console.error('Error getting temperature for room1:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get temperature of room2
app.get('/rooms/room2/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'room2' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ temperature: room.temperature });
    } catch (error) {
        console.error('Error getting temperature for room2:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get temperature of hall
app.get('/rooms/hall/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'hall' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ temperature: room.temperature });
    } catch (error) {
        console.error('Error getting temperature for hall:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get temperature of kitchen
app.get('/rooms/kitchen/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'kitchen' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ temperature: room.temperature });
    } catch (error) {
        console.error('Error getting temperature for kitchen:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get light status of room1
app.get('/rooms/room1/lights', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'room1' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ lights: room.lights });
    } catch (error) {
        console.error('Error getting light status for room1:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get light status of room2
app.get('/rooms/room2/lights', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'room2' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ lights: room.lights });
    } catch (error) {
        console.error('Error getting light status for room2:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get light status of hall
app.get('/rooms/hall/lights', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'hall' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ lights: room.lights });
    } catch (error) {
        console.error('Error getting light status for hall:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get light status of kitchen
app.get('/rooms/kitchen/lights', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'kitchen' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ lights: room.lights });
    } catch (error) {
        console.error('Error getting light status for kitchen:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

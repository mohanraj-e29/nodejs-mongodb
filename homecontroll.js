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


// Update humidity of room1
app.post('/rooms/room1/humidity', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'room1' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.humidity = req.body.humidity;
        await room.save();
        res.json({ status: 'Humidity updated for room1' });
    } catch (error) {
        console.error('Error updating humidity for room1:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update humidity of room2
app.post('/rooms/room2/humidity', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'room2' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.humidity = req.body.humidity;
        await room.save();
        res.json({ status: 'Humidity updated for room2' });
    } catch (error) {
        console.error('Error updating humidity for room2:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update humidity of hall
app.post('/rooms/hall/humidity', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'hall' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.humidity = req.body.humidity;
        await room.save();
        res.json({ status: 'Humidity updated for hall' });
    } catch (error) {
        console.error('Error updating humidity for hall:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update humidity of kitchen
app.post('/rooms/kitchen/humidity', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'kitchen' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.humidity = req.body.humidity;
        await room.save();
        res.json({ status: 'Humidity updated for kitchen' });
    } catch (error) {
        console.error('Error updating humidity for kitchen:', error);
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

// Update temperature of room1
app.post('/rooms/room1/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'room1' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.temperature = req.body.temperature;
        await room.save();
        res.json({ status: 'Temperature updated for room1' });
    } catch (error) {
        console.error('Error updating temperature for room1:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update temperature of room2
app.post('/rooms/room2/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'room2' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.temperature = req.body.temperature;
        await room.save();
        res.json({ status: 'Temperature updated for room2' });
    } catch (error) {
        console.error('Error updating temperature for room2:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update temperature of hall
app.post('/rooms/hall/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'hall' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.temperature = req.body.temperature;
        await room.save();
        res.json({ status: 'Temperature updated for hall' });
    } catch (error) {
        console.error('Error updating temperature for hall:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update temperature of kitchen
app.post('/rooms/kitchen/temperature', async (req, res) => {
    try {
        const room = await Room.findOne({ name: 'kitchen' });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.temperature = req.body.temperature;
        await room.save();
        res.json({ status: 'Temperature updated for kitchen' });
    } catch (error) {
        console.error('Error updating temperature for kitchen:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

require('dotenv').config();
const mongoose = require('mongoose');

const conn = process.env.CONN;

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

// Pre-create rooms
const rooms = [
    { name: 'room1', temperature: 22, lights: false, humidity: 45 },
    { name: 'room2', temperature: 22, lights: false, humidity: 46 },
    { name: 'hall', temperature: 22, lights: false, humidity: 47 },
    { name: 'kitchen', temperature: 22, lights: false, humidity: 48 }
];

Room.insertMany(rooms, { ordered: false })
    .then(() => console.log('Rooms pre-created'))
    .catch(err => console.error('Error pre-creating rooms:', err))
    .finally(() => mongoose.connection.close());

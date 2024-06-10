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

// Define the ToDo schema
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false }
});

// Create the ToDo model
const Todo = mongoose.model('Todo', todoSchema);

// Create a new ToDo item
app.post('/todos', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTodo = new Todo({ title: trimmedTitle, completed });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all ToDo items
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Toggle completion status of a ToDo item
app.patch('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: 'ToDo item not found' });
        }

        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a ToDo item by id

// Delete a ToDo item by id
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todo.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'ToDo item not found' });
        }

        res.status(204).send(); // Send a success response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle any errors
    }
});


app.listen(PORT, () => {
    console.log(`ToDo app listening at http://localhost:${PORT}`);
});

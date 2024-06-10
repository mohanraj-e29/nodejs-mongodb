const express = require('express');
const app = express();
const port = 3001; // Change this to any available port number

app.use(express.json());

let todos = [];

// Create a new ToDo item
app.post('/todos', (req, res) => {
    const { title } = req.body;
    const completed = req.body.completed || false;
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = { id: todos.length + 1, title: trimmedTitle, completed };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Get all ToDo items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Toggle completion status of a ToDo item
app.patch('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == id);

    if (!todo) {
        return res.status(404).json({ message: 'ToDo item not found' });
    }

    todo.completed = !todo.completed;
    res.json(todo);
});

// Delete a ToDo item by id
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(t => t.id == id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'ToDo item not found' });
    }

    todos.splice(todoIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`ToDo app listening at http://localhost:${port}`);
    
});

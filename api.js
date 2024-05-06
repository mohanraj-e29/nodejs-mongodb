const bodyParser = require('body-parser');
const { todos, users } = require('./db/user');
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express()


//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get("/data", async (req, res) => {
    try {
        // Retrieve all todos from the database
        const allTodos = await todos.find({});
        res.json(allTodos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// TODO ENDPOINTS
app.post('/create', async (req, res) => {
    const todoBody = req.body;

    const todo = await todos.create({
        title: todoBody.title,
        desc: todoBody.desc,
        active: todoBody.active,
        dateCreated: Date.now(),
        owner: todoBody.owner,
    });

    todo ? res.status(201).json({msg: "Success", data: todo}) : res.status(500).json({msg: "Error", data: todo})
})

app.delete('/delete/:id', async (req, res) => {
    const todoId = req.params.id;
    const deletedTodo = await todos.deleteOne({_id: todoId})

    deletedTodo ? res.status(200).json({msg: "Success", data: deletedTodo}) 
                : res.status(500).json({msg: "Error", data: deletedTodo}) 
})

app.put('/update/:id', async (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;

    //                                         id            newtodo
    const todo = await todos.findOneAndUpdate({_id: todoId}, updatedTodo);

    todo ?  res.status(200).json({msg: "Success", data: todo}) 
                : res.status(500).json({msg: "Error", data: todo}) 
})

app.put('/enable/:id', async (req, res) => {
    const todoId = req.params.id;
    const todo = await todos.findOneAndUpdate({_id: todoId}, {active: true});

    todo ? res.status(200).json({msg: "Success", data: todo}) 
                : res.status(500).json({msg: "Error", data: todo}) 
})

app.put('/disable/:id', async (req, res) => {
    const todoId = req.params.id;
    const todo = await todos.findOneAndUpdate({_id: todoId}, {active: false});

    todo ? res.status(200).json({msg: "Success", data: todo}) 
                : res.status(500).json({msg: "Error", data: todo}) 
})

// USERS ENDPOINTS
app.post('/user/create', async (req, res) => {
    const user = req.body;
    const newUser = await users.create(user);

    newUser ? res.status(201).json({msg: "Success", data: newUser}) 
            : res.status(500).json({msg: "Error", data: newUser})
})

app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`))
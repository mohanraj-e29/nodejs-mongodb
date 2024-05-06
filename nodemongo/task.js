const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Sample user data
const users = [
    {
        "username": "mohanraj",
        "pass": 123,
        "address": "chennai"
    },
    {
        "username": "jojo",
        "pass": 456,
        "address": "japan"
    }
];


// GET request to fetch user data by name
app.get("/getuser", (req, res) => {
    const name = req.query.name; // Accessing query parameter using req.query
    const user = users.find(user => user.username === name);
    if (user) {
        res.json(user);
    } else {
        res.json("User not found");
    }
});

//Post request
app.post("/login", (req, res) => {
    const body = req.body;
    const username = body.username;
    const pass = body.pass;
    if (username === "mohanraj" && pass === 123)
        res.end("successfully logged in");
    else
        res.end("Incorrect details");
});

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Application started...");
});








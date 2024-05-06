const express = require("express");
const bodyparser=require("body-parser");
const app = express();

app.use(bodyparser.json())
// GET request to "/"
app.get("/", (req, res) => {
    res.send("Hello World!"); // Sending "Hello World!" as the response
});

// GET request to "/about"
app.get("/about", (req, res) => {
    res.send("How are you!"); // Sending "How are you!" as the response
});

// GET request to "/name/:myname"
app.get("/name/:myname", (req, res) => {
    const myName = req.params.myname; // Accessing route parameter using req.params
    res.send("Hello " + myName); // Sending "Hello" followed by the name received in the request as the response
});

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Application started...");
});


//Post request 
app.post("/login", (req, res) => {
    const body=req.body;
    const username=body.username;
    const pass=body.pass;
    if(username==="mohanraj" && pass===123)
       res.end("successfully logedin")
    else
    res.end("Incorrect details")
})







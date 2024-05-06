require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const app = express()

const conn = process.env.CONN;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
};

app.use(cors())
app.use(allowCrossDomain)
app.options('*', cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


mongoose.connect(conn)
        .then(() => console.log('connected'))
        .catch(() => console.log('Error'))

// const demoSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number
//     },
//     salary: {
//         type: Number
//     },
//     email: {
//         type: String,
//         required: true
//     }
// })
const demoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        
    }
});


const user = mongoose.model('mymodel', demoSchema, 'apptest')

// GET Request (ENDPOINTS)
app.get("/", (req, res) => {
    res.end("Hello world")
})

app.get("/about", (req, res) => {
    res.end("welcome to about page")
})

// http://localhost:8080/name/aaryan

app.get("/name/:myname", (req, res) => {
    res.end("welcome " + req.params.myname)
})

app.get("/data", async (req, res) => {
    try {
        // Retrieve all data from the database
        const data = await user.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST Request (ENDPOINTS)
// TODO:body-parser

app.post("/login", (req, res) => {
    const body = req.body;
    const username = body.username;
    const pass = body.pass;

    if(username === "aryan" && pass === 123)
        res.json({
            data: "success",
        })
    else 
        res.end("Incorrect creds")
})

app.post('/create', async (req, res) => {
    const body = req.body;

    const id = body.id;
    const title = body.title;
    const description = body.description;
    const time = body.time;

    const insertedUser = await user.create({id: id, title: title, description: description, time: time})

    res.json({msg: "User inserted successfully", data: insertedUser})
})
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        res.json({ message: 'User registered successfully', data: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/id/:name', async (req, res) => {
    const name = req.params.name;

    const namedUser = await user.find({name: name})//.where('name').equals(name);

    res.json({msg: "success", data: namedUser})
})


// http://localhost:8080/
//https://nodejs-mongodb-466d.onrender.com
app.listen(PORT, () => console.log("Application started on PORT " + PORT))
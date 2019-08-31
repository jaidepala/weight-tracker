const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const generatePassword = require('password-generator');
const mongoose = require("mongoose");

// const port = process.env.PORT || 5000;
const { endpoint, masterKey, port } = require('./config');

const app = express();

const dbRoute = endpoint;

// connects our back end code with the database
mongoose.connect(dbRoute, {
    useNewUrlParser: true
});

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger("dev"));

// Controllers
const wiki = require('./server/controllers/user');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
    const count = 5;

    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(i =>
        generatePassword(12, false)
    )

    // Return them as json
    res.json(passwords);

    console.log(`Sent ${count} passwords`);
});

app.use('/api/wiki', wiki);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port);

console.log(`Password generator listening on ${port}`);
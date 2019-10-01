/*
               ______________________________________
      ________|                                      |_______
      \       |        Reference Links               |      /
       \      |                                      |     /
       /      |______________________________________|     \
      /__________)                                (_________\
    *   
    *   Links
    *   
    *   Session Management:
    *   https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
    *   https://codeforgeek.com/manage-session-using-node-js-express-4/ 
    *   
    *   
    *   Reason for using useCreateIndex in mongoose.connect()
    *   https://github.com/Automattic/mongoose/issues/6890
    *   
    *   
    *   
    *   
*/
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const generatePassword = require('password-generator');
const mongoose = require("mongoose");
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid/v4');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

// Controllers
const wiki = require('./server/controllers/user');
const login = require('./server/controllers/login.controller');

// const port = process.env.PORT || 5000;
const { endpoint, masterKey, port } = require('./config');

const app = express();

const dbRoute = endpoint;

// connects our back end code with the database
mongoose.connect(dbRoute, {
    useCreateIndex: true,
    useNewUrlParser: true
});

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const users = [
    { id: '2f24vvg', email: 'test@test.com', password: 'password' }
]

// configure passport.js to use the local strategy
// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {

        axios.get(`http://localhost:5000/users?email=${email}`)
            .then(res => {
                const user = res.data[0]
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                }
                return done(null, user);
            })
            .catch(error => done(error));
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(`The user id passport saved in the session file store is: ${id}`)
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
});

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger("dev"));

app.use(passport.initialize());
app.use(passport.session());

// add & configure middleware
app.use(session({
    genid: (req) => {
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

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
app.use('/api/login', login);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

app.get('/', (req, res) => {
    console.log('\nInside the homepage callback function')
    console.log(req.sessionID)
    res.send(`You hit home page!\n`)
})

app.listen(port);

console.log(`Password generator listening on ${port}`);
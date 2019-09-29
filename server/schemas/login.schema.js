const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const LoginSchema = new Schema({
    // username: String,
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    // password: String
    password: {
        type: String,
        required: true,
    }
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Login", LoginSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema({
    dateofbirth: {
        type: String,
        trim: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    heightType: {
        type: Object,
        required: true
    },
    weightType: {
        type: Object,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);

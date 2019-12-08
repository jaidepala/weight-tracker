const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const CardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true
    },
    cardHolder: {
        type: String,
        required: true
    },
    cardCvv: {
        type: String,
        required: true
    },
    cardExpiry: {
        type: String,
        required: true
    }
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Card", CardSchema);

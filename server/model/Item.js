const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = ItemSchema;
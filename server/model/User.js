const mongoose = require('mongoose')
const ItemSchema = require('./Item');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    itemList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Item',
        required: true,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = UserSchema;
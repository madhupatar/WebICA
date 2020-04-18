const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    userType: {
        type: String,
        enum: ["Admin", "Moderator", "User"]
    }
}, {collection: 'users'})
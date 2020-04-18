const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    type: String
}, {collection: 'users'})
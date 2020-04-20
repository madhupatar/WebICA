const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    fromUser: String,
    toUser: String,
    content: String,
    time: Date,
    conversationId: {type: mongoose.Types.ObjectId, ref: "conversationModel"}
}, {collection: 'message'})
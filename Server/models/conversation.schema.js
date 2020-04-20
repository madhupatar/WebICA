const mongoose = require('mongoose');
const message = require('./message.model')

const conversation = mongoose.Schema({
    message: [{type: mongoose.Types.ObjectId, ref: 'MessageModel'}],
    fromUser: String,
    toUser: String,
    convoType: {
        type: String,
        enum: ["Group", "Individual"],
        default: "Individual"
    },
    moderator: {
        type: String,
        required: function() {
            return this.convoType === "Group"
        }
    }
}, {collection: 'conversation'})

module.exports = conversation
const mongoose = require('mongoose');
const message = require('./message.model')

const conversation = mongoose.Schema({
    message: [{type: mongoose.Types.ObjectId, ref: 'MessageModel'}],
    fromUser: String,
    toUser: {
        type: String,
        required: function() {
            return this.convoType !== "Group"
        },
        default: ""
    },
    convoType: {
        type: String,
        enum: ["Group", "Individual"],
        default: "Individual"
    },
    groupId: {
        type: String,
        required: function() {
            return this.convoType === "Group"
        }
    }
}, {collection: 'conversation'})

module.exports = conversation
const messageDao = require('../daos/messageDao');
const conversationDao = require("../daos/conversationDao");

module.exports = function(app, socket) {
    app.get("/users/:userName/conversations", (req, res) => {
        conversationDao.findAllConvByUserName(req.params.userName)
        .then(conv => res.json(conv))
        .catch(() => res.status(400).send("Failed"))
    })

    app.get("/conversations/:id/messages", (req, res) => {
        messageDao.getMessageByConversationId(req.params.id)
        .then(msgs => res.json(msgs))
        .catch(() => res.status(400).send("Failed"))
    })

    app.post("/conversations", (req, res) => {
        const convInfo = {
            message: [],
            fromUser: req.body.fromUser,
            toUser: req.body.toUser,
            convoType: req.body.convoType
        };
        console.log("convInfo")
        console.log(convInfo)
        conversationDao.createConvBtwTwoUsers(convInfo)
        .then((conv) => res.json(conv))
        .catch(() => res.status(400).send("Failed"))
    })

    app.put("/conversations/:id/messages", (req, res) => {
        const convId = req.params.id;

        messageDao.createMessage(req.body.message)
        .then((msg) => conversationDao.updateMessageListInConversation(convId, msg._id))
        .then(() => {
            res.send("Success")
            // socket.emit('NEW_MESSAGE', req.body.message)
        })
        .catch(() => res.status(400).send("Failed"))
    })

    app.put("/messages/:id", (req, res) => {
        const messageInfo = {
            _id: req.params.id,
            fromUser: req.body.fromUser,
            toUser:req.body.userName,
            content: req.body.content,
            time: Date.now()
        }
        messageDao.editMessage(_id, messageInfo)
        .then(() => res.send("Message updated successfully"))
        .catch(() => res.status(400).send("Failed to edit the message"))
    })

    app.delete("/messages/:id", (req, res) => {
        const msgId = messageDao.getMessageById(req.params.msgId)
        messageDao.deleteMessage(msgId)
        .then(() => conversationDao.findConvById(req.header.conversationId))
        .then((conv) => {
            let i = conv.listOfMsgs.indexOf(msgId)
            conv.listOfMsgs.splice(i, 1)
            res.json(conv)
        })
        .catch(() => res.status(400).send("Failed to delete the message")) 
    })
}
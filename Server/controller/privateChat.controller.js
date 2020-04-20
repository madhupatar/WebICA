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

    app.get("/conversations", (req, res) => {
        conversationDao.findAllConversations()
        .then(conv => res.json(conv))
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
            socket.emit('NEW_MESSAGE', req.body.message)
            res.send("Success")
        })
        .catch(() => res.status(400).send("Failed"))
    })

    app.get("/messages/:id", (req, res) => {
        messageDao.getMessageById(req.params.id)
        .then((msg) => res.json(msg))
        .catch(() => res.status(400).send("Failed"))
    })

    app.put("/messages/:id", (req, res) => {
        const messageInfo = {
            _id: req.params.id,
            fromUser: req.body.fromUser,
            toUser:req.body.userName,
            content: req.body.content,
            conversationId: req.body.conversationId,
            time: req.body.time
        }
        messageDao.editMessage(_id, messageInfo)
        .then(() => res.send("Message updated successfully"))
        .catch(() => res.status(400).send("Failed to edit the message"))
    })

    app.delete("/messages/:id", (req, res) => {
        messageDao.deleteMessage(req.params.id)
        .then(() => conversationDao.findConvById(req.headers.conversationId))
        .then((conv) => {
            let i = conv.message.indexOf(msgId)
            conv.message.splice(i, 1)
            conversationDao.updateConversation(conv)
            .then(() => res.send("success"))
            .catch(() => res.status(400).send("Failed to delete the message from conversation"))
        })
        .catch(() => res.status(400).send("Failed to delete the message")) 
    })
}
const messageDao = require('../daos/messageDao');
const conversationDao = require("../daos/conversationDao");
const groupDao = require("../daos/groupDao");
const privateChatDao = require("../daos/privateChatDao");

module.exports = function(app, socket) {
    app.get("/users/:userName/conversations", (req, res) => {
        conversationDao.findAllConversations()
        .then(async conv => {
            let newConversation = conv.map(async conversation => {
                const newConv = {
                    _id: conversation._id,
                    message: conversation.message,
                    convoType: conversation.convoType
                }

                if (conversation.convoType == "Group") {
                    let groupInfo = await groupDao.getGroupById(conversation.groupId);
                    if (groupInfo.userList.includes(req.params.userName) || groupInfo.moderator == req.params.userName) {
                        newConv.groupName = groupInfo.name
                        newConv.groupId = groupInfo._id
                    }
                    else {
                        newConv == null
                    }
                }
                else {
                    let privateChatInfo = await privateChatDao.getPrivateChatById(conversation.privateChatId);
                    if (privateChatInfo.fromUser == req.params.userName || privateChatInfo.toUser == req.params.userName) {
                        newConv.fromUser = privateChatInfo.fromUser
                        newConv.toUser = privateChatInfo.toUser
                        newConv.privateChatId = privateChatInfo._id
                    }
                    else
                    newConv = null
                }

                return newConv
            })

            return await Promise.all(newConversation)
        })
        .then(val => {
            const retVal = val.filter(values => values != null)
            res.json(retVal)
        })
        .catch(() => res.status(400).send("Failed"))
    })

    app.get("/conversations/:id/messages", (req, res) => {
        messageDao.getMessageByConversationId(req.params.id)
        .then(msgs => res.json(msgs))
        .catch(() => res.status(400).send("Failed"))
    })

    app.get("/conversations", (req, res) => {
        conversationDao.findAllConversations()
        .then(async conv => {
            let newConversation = conv.map(async conversation => {
                const newConv = {
                    _id: conversation._id,
                    message: conversation.message,
                    convoType: conversation.convoType
                }

                if (conversation.convoType == "Group") {
                    let groupInfo = await groupDao.getGroupById(conversation.groupId);
                    newConv.groupName = groupInfo.name
                    newConv.groupId = groupInfo._id
                }

                else {
                    let privateChatInfo = await privateChatDao.getPrivateChatById(conversation.privateChatId);
                    newConv.fromUser = privateChatInfo.fromUser
                    newConv.toUser = privateChatInfo.toUser
                    newConv.privateChatId = privateChatInfo._id
                }

                return newConv
            })
            
            // console.log(newConversation)
            return await Promise.all(newConversation)
        })
        .then(val => {
            const retVal = val.filter(values => values != null)
            res.json(retVal)
        })
        .catch(() => res.status(400).send("Failed"))
    })

    app.post("/conversations", (req, res) => {
        const convInfo = {
            message: [],
            convoType: req.body.convoType
        };

        if (req.body.convoType === "Group") {
            convInfo.groupId = req.body.groupId
        }
        else {
            convInfo.privateChatId = req.body.privateChatId
        }
        
        conversationDao.createConvBtwTwoUsers(convInfo)
        .then((conv) => res.json(conv))
        .catch(() => res.status(400).send("Failed"))
    })

    app.delete("/conversations/:id", (req, res) => {
        conversationDao.deleteConversationById(req.params.id)
        .then(() => res.send("Success"))
        .catch(() => res.status(404).send("Failed"))
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
}
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_4p1h0rnq:94oqvg5cbir0mb6um96fh2ohah@ds249008.mlab.com:49008/heroku_4p1h0rnq')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const userController = require('./controller/user.controller')
const privateChatController = require('./controller/privateChat.controller');
const groupController = require("./controller/groupChat.controller")
const conversationController = require("./controller/conversation.controller")
const messageController = require("./controller/message.controller");

server = app.listen(process.env.PORT || 4000)
const socket = require('socket.io')
io = socket(server)

let userNameToSocketId = {}

io.on('connection', (socket) => {
    socket.on("JOINING", (data) => {
        userNameToSocketId[data] = socket.id
        conversationController(app, io, userNameToSocketId);
    })

    userController(app, io);
    messageController(app, io);
    privateChatController(app, io);
    groupController(app, io);
})
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatApplication')

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

server = app.listen(4000)
const socket = require('socket.io')
io = socket(server)

io.on('connection', (socket) => {
    console.log("New connection");

    userController(app, io);
    messageController(app, io);
    conversationController(app, io);
    privateChatController(app, io);
    groupController(app, io);
    
    // socket.on('SEND_MESSAGE', function(data){
    //     console.log("got a message");
    //     data.to = "User 2";
    //     io.emit('RECEIVE_MESSAGE', data);
    // })
})
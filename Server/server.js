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

// Require all controllers here
const userController = require('./controller/user.controller')

server = app.listen(4000)
const socket = require('socket.io')
io = socket(server)

// Sample echo logic with socket on the server
io.on('connection', (socket) => {
    console.log("New connection");

    userController(app, socket);
    
    // socket.on('SEND_MESSAGE', function(data){
    //     console.log("got a message");
    //     data.to = "User 2";
    //     io.emit('RECEIVE_MESSAGE', data);
    // })
})
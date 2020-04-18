const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatApplication')

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const userController = require('./controller/user.controller')

// Paths to api's
app.route("/users")
    .get(userController.getAllUsers)
    .post(userController.createUser);

app.route("/users/:userName")
    .get(userController.getByUserName);

app.listen(4000)
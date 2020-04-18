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

// Paths to api's
app.route("/login")
    .get(userController.findUserByCrendentials);

app.route("/users")
    .get(userController.getAllUsers)
    .post(userController.createUser);

app.route("/users/:userName")
    .get(userController.getByUserName)
    .put(userController.updateUserDetails);

app.route("/search/:keyword")
    .get(userController.getUserByKeyword);

app.listen(4000)
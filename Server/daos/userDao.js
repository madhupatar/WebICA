const mongoose = require('mongoose');
const userModel = require('../models/user.model');

findUserByUserName = (username) => {
    return userModel.findOne({userName: username});
}

createUser = (userInfo) => {
    return userModel.create(userInfo);
}

findAllUsers = () => {
    return userModel.find();
}

findUserByCredentials = (userName, password) => {
    return userModel.find({userName: userName, password: password});
}

updateUserDetails = (userName, userInfo) => {
    return userModel.updateOne({userName: userName}, {$set: {...userInfo}})
}

module.exports = {
    findUserByUserName, createUser, findAllUsers, findUserByCredentials, updateUserDetails
}
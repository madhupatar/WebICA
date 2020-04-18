const userDao = require('../daos/userDao');

exports.getByUserName = (req, res) => {
    userDao.findUserByUserName(req.params.userName)
    .then((user) => res.send(user))
};

exports.getAllUsers = (req, res) => {
    userDao.findAllUsers()
    .then((users) => res.send(users))
}

exports.createUser = (req, res) => {
    const userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        type: req.body.type
    };

    userDao.createUser(userInfo)
    .then(() => res.send("Created User successfully."))
}
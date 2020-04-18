const userDao = require('../daos/userDao');

exports.getByUserName = (req, res) => {
    userDao.findUserByUserName(req.params.userName)
    .then((user) => res.json(user))
    .catch(() => res.status(400).send("Failed"))
};

exports.getAllUsers = (req, res) => {
    userDao.findAllUsers()
    .then((users) => res.json(users))
    .catch(() => res.status(400).send("Failed"))
}

exports.createUser = (req, res) => {
    const userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
    };

    if (typeof req.body["password"] !== 'undefined')
        userInfo["password"] = req.body.password

    if (typeof req.body["userType"] !== 'undefined')
        userInfo["userType"] = req.body.userType

    userDao.createUser(userInfo)
    .then(() => res.send("Created User successfully."))
    .catch(() => res.status(400).send("Failed"))
}

exports.findUserByCrendentials = (req, res) => {
    userDao.findUserByCredentials(req.headers.username, req.headers.password)
    .then((user) => res.json(user))
    .catch(() => res.status(400).send("Failed to login"))
}
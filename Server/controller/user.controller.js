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
        password: req.body.password,
        userType: req.body.userType
    };

    userDao.createUser(userInfo)
    .then(() => res.send("Created User successfully."))
    .catch(() => res.status(400).send("Failed"))
}
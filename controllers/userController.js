const { User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((user) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-_v')
      .populate('posts')
      .then((user) => 
      !user
        ? res.status(404).json({ message: 'no user with that ID' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

};
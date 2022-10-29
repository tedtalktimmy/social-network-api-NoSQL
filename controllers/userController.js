const { Thought, User } = require('../models');

module.export = {
  getUser(req, res) {
    User.find({}).then((user) => res.json(user)).catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends').select('-__v').then((user) =>
      !user
        ? res.status(404).json({ message: 'no user with id bruv' })
        : res.json(user)
    ).catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body).then((user) => res.json(user)).catch((err) =>
      res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId
      },
      {
        $set: req.body
      },
      {
        runValidators: true,
        new: true
      }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: 'no user with id bruv' })
        : res.json(user)
    ).catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'no user with id bruv' })
          : Thought.deleteMany({ _id: { $in: User.thoughts } })
      ).then(() => res.json({ message: 'user adn thought deleted bruv' })).catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId
      },
      {
        $addToSet:
        {
          friends: req.params.friendId
        }
      },
      {
        runValidators: true,
        new: true
      }
    ).then((User) =>
      !User
        ? res.status(404).json({ message: 'no user with id bruv' })
        : res.json(user)
    ).catch((err) => res.status(500).json(err));
  },
};
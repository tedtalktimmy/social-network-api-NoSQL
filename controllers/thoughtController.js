const { Thought, User } = require('../models');

module.exports = {
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-_v',
      })
      .sort({ _id: -1 })
      .select('-_v')
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-_v',
      })
      .select('-_v')
      .then((dbThoughtData) => {
        if (dbThoughtData) {
          return res.json(dbThoughtData);
        }
        return res.status(404).json({ message: 'no thought with such id, bruv' });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createThought({ params, body }, res) {
    Thought.create(body).then(({ _id }) => {
      return User.findOneAndUpdate(
        {
          _id: body.userId
        },
        {
          $push: { thoughts: _id }
        },
        {
          new: true
        }
      );
    }).then((dbUserData) => {
      if (dbUserData) {
        return res.json({ message: 'thought created, bruv' });
      } else {
        return res.status(404).json({ message: 'although thought was created, there is no user with such id, bruv' });
      }
    })
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.id
      },
      body, {
      new: true,
      runValidators: true,
    }).then((dbThoughtData) => {
      if (dbUserData) {
        return res.json(dbThoughtData);
      } else {
        return res.status(404).json({ message: 'no thought with such id, bruv' });
      }
    }).catch((err) => res.json(err));
  },


}
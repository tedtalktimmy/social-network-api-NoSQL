const { Thought, User } = require('../models');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({}).then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }).select('-__v').then((thought) =>
      !thought
        ? res.status(400).json({ message: 'no thought with id bruv' })
        : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body).then(({ _id }) => {
      return User.findOneAndUpdate(
        {
          _id: req.body.userId
        },
        {
          $push:
          {
            thought: _id
          }
        },
        {
          new: true
        }
      );
    }).then((thought) => 
    !thought
    ? res.status(404).json({ message: 'no user with id bruv' })
    : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId
      },
      {
        $set: req.body
      },
      {
        runValidators: true,
        New: true
      }
    ).then((user) => 
    !user
    ? res.status(404).json({ message: 'nothought with id bruv' })
    : res.json(user)
    ).catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }).then((thought) =>
      !thought
      ? res.status(404).json({ message: 'no thought found with id bruv' })
      : User.findOneAndUpdate(
        {
          thoughts: req.params.thoughtId
        },
        {
          $pull: 
          {
            thoughts: req.params.thoughtId
          }
        },
        {
          new: true
        }
      )
    ).then((user) => 
    !user
    ? res.status(404).json({ message: 'user not found bruv, but thought been deleted' })
    : res.json({ message: 'thought deleted with no issues bruv' })
    ).catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId
      },
      {
        $addToSet: 
        {
          reactions: req.body
        }
      },
      {
        runValidators: true,
        new: true
      }
    ).then((thought) => 
    !thought
    ? res.status(404).json({ message: 'no thought with id bruv' })
    : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId
      },
      {
        $pull:
        {
          reactions: 
          {
            reactionId: req.params.reactionId
          }
        }
      },
      {
        runValidators: true,
        new: true
      }
    ).then((thought) =>
    !thought
    ? res.status(404).json({ message: 'no thought found with id bruv' })
    : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },
};
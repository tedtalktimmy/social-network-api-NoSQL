const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },

    toJson: {
      getters: true,
    },
    id: false,
  });

  const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: 'you need to leave a though',
        minlength: 1,
        maxlength: 280,
        trim: true,
      },
      username: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      reactions: [reactionSchema],
    },
    {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });

  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  const Thought = model('Thought', thoughtSchema);

  module.exports = Thought;
const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sharedFileIds: [
      {
        type: String,
      },
    ],
    editableFileIds: [{ type: String }],
  },
  {
    collection: 'usersdata',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const UserData = mongoose.model('usersdata', UserDataSchema);

module.exports.UserData = UserData;

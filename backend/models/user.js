const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { UserData } = require('./userData');

const roleTypes = ['admin', 'user', 'researcher', 'collaborator'];

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: roleTypes,
    default: 'User',
  },
});

UserSchema.virtual('userData', {
  ref: UserData,
  foreignField: 'userId',
  localField: '_id',
  justOne: true,
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      role: this.role,
    },
    config.get('jwtPrivateKey')
  );
  return token;
};

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required().label('Username'),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
    password: Joi.string().required().label('Password'),
    role: Joi.string().valid(...roleTypes),
  });
  const result = schema.validate(user);
  return result;
}

module.exports.User = User;
module.exports.validate = validateUser;

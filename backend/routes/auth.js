const config = require('config');
const express = require('express');
const simpleCrypt = require('simplecrypt');
const sc = simpleCrypt({ password: config.get('jwtPrivateKey') });

const { User, validate } = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  let user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    return res.status(400).json('User already exists');
  }
  const encryptedPassword = sc.encrypt(password);

  user = new User({
    username: username,
    email: email,
    password: encryptedPassword,
    role: role,
  });
  try {
    user = await user.save();
    const token = user.generateAuthToken();
    res.json(token);
  } catch (error) {
    res.status(500).json('Something Unexpected Happened');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email: username }] });
  if (!user) {
    return res.status(404).json('User Not Found');
  }
  const decryptedPassword = sc.decrypt(user.password);
  if (password !== decryptedPassword) {
    return res.status(400).json('Invalid Username/Password');
  }
  const token = user.generateAuthToken();
  res.json(token);
});

module.exports = router;

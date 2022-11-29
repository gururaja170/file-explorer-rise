const express = require('express');
const { FolderTree } = require('../models/folderTree');
const { User } = require('../models/user');
const { UserData } = require('../models/userData');
const { roleBasedEditableFileIds } = require('../utils/filterTree');
const { convertToObjectId } = require('../utils/objectId');
const router = express.Router();

router.get('/:role', async (req, res) => {
  try {
    let users = await User.find({ role: req.params.role })
      .select('-password')
      .populate('userData');
    users = users.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      userData: { sharedFileIds: user?.userData?.sharedFileIds },
    }));
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Something Unexpected Happened');
  }
});

router.post('/:id/share-files', async (req, res) => {
  try {
    const id = convertToObjectId(req.params.id);
    if (!id) {
      return res.status(400).json('Invalid id');
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json('User not found');
    }

    const { sharedFileIds } = req.body;

    if (!Array.isArray(sharedFileIds)) {
      return res.status(400).json('Data Should be an List of Strings');
    }
    let userData = await UserData.findOne({ userId: id });
    if (!userData) {
      const folderTree = await FolderTree.findOne();
      userData = new UserData({
        userId: id,
        sharedFileIds,
        editableFileIds: roleBasedEditableFileIds(folderTree)[user.role],
      });
    } else {
      userData.sharedFileIds = sharedFileIds;
    }
    userData = await userData.save();
    return res.json(userData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const { User } = require('../models/user');
const { FolderTree } = require('../models/folderTree');

const { convertToObjectId } = require('../utils/objectId');
const { filterTree } = require('../utils/filterTree');

router.get('/:id', async (req, res) => {
  try {
    const id = convertToObjectId(req.params.id);
    if (!id) {
      return res.status(404).json('User not found');
    }
    const user = await User.findById(id)
      .select('-password')
      .populate('userData');
    if (!user) {
      return res.status(404).json('User not found');
    }
    const folderTree = await FolderTree.findOne();
    switch (user.role) {
      case 'admin':
        folderTree.module = 'Administrator';
        return res.json(folderTree);
      case 'researcher':
        folderTree.module = 'Researcher';
        break;
      case 'user':
        folderTree.module = 'User';
        break;
    }
    const { sharedFileIds, editableFileIds } = user?.userData;
    let filteredTree = filterTree(folderTree, sharedFileIds);
    filteredTree['_doc']['editableFileIds'] = editableFileIds;
    return res.json(filteredTree);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Something unexpected happened');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = convertToObjectId(req.params.id);
    if (!id) {
      return res.status(400).json('Invalid Id');
    }
    const folderTree = await FolderTree.findByIdAndUpdate(id, req.body, {
      upsert: true,
      new: true,
    });
    return res.json(folderTree);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;

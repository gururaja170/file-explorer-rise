const mongoose = require('mongoose');

const FolderTreeSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  module: {
    type: String,
  },
  collapsed: {
    type: Boolean,
    default: true,
  },
  leaf: {
    type: Boolean,
    default: false,
  },
  children: [
    {
      type: Object,
      ref: 'FolderTreeSchema',
    },
  ],
});

const FolderTree = mongoose.model('filestructure', FolderTreeSchema);

module.exports.FolderTree = FolderTree;

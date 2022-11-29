const mongoose = require('mongoose');

const isValidObjectId = (id) => {
  return mongoose.isValidObjectId(id);
};

const convertToObjectId = (id) => {
  if (isValidObjectId(id)) {
    return mongoose.Types.ObjectId(id);
  }
  return undefined;
};

module.exports = {
  convertToObjectId,
  isValidObjectId,
};

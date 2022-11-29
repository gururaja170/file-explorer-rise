const auth = require('../routes/auth');
const users = require('../routes/users');
const folderTree = require('../routes/folderTree');

module.exports = function (app) {
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/folder-tree', folderTree);
};

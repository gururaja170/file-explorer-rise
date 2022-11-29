const _ = require('lodash');
const deepdash = require('deepdash');
deepdash(_);

const filterTree = (tree, nodeIds) => {
  if (nodeIds.length) {
    const filteredTree = _.filterDeep(
      tree,
      (item) => {
        return nodeIds.includes(item.id);
      },
      { childrenPath: 'children' }
    );
    return filteredTree;
  }
  return {};
};

const roleBasedEditableFileIds = (tree, fileId = 'root-3') => {
  const projectsObj = _.findDeep(tree, (item) => item.id === fileId, {
    childrenPath: 'children',
  });

  const allProjectFileIds = [];
  const getAllIds = (obj) => {
    allProjectFileIds.push(obj.id);
    if (obj.children) {
      obj.children.map((child) => getAllIds(child));
    }
  };
  getAllIds(projectsObj.value);

  return {
    user: [],
    researcher: allProjectFileIds,
  };
};

module.exports = {
  filterTree,
  roleBasedEditableFileIds,
};

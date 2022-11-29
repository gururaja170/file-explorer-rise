import _ from 'lodash';
import deepdash from 'deepdash';
import React, { useEffect, useState, useMemo } from 'react';
import Tree from 'react-ui-tree';

import TreeNode from './TreeNode';

import 'react-ui-tree/dist/react-ui-tree.css';
import { useLazyUpdateFolderTreeQuery } from '../../apiServices/treeService';
import { useDispatch } from 'react-redux';
import { setFolderTree } from '../../redux/folderTree/folderTreeSlice';

deepdash(_);

const deleteFromTree = (newTree, id) => {
  let index = -1;
  const getNode = (a, i) => {
    if (a.id === id) {
      index = i;
      return true;
    }
    if (Array.isArray(a.children) && a.children.some(getNode)) {
      if (~index) {
        a.children.splice(index, 1);
        index = -1;
      }
      return true;
    }
  };
  [newTree].some(getNode);
};

const FolderTree = ({
  treeData,
  handleClick,
  isAdmin,
  errorMsg = 'Provide treeData',
  disableRightClick = false,
  disableFileAndFolderAddition = false,
}) => {
  const dispatch = useDispatch();
  const [tree, setTree] = useState(treeData || {});

  let { editableFileIds = [] } = treeData || {};
  editableFileIds = useMemo(
    () => Object.assign({}, ...editableFileIds?.map((id) => ({ [id]: true }))),
    [editableFileIds]
  );

  const [updateFolderTree] = useLazyUpdateFolderTreeQuery();

  useEffect(() => {
    if (treeData && Object.keys(treeData).length) {
      setTree((prev) => ({ ...prev, ...treeData }));
    }
  }, [treeData]);

  useEffect(() => {
    if (tree && Object.keys(tree).length) {
      dispatch(setFolderTree(_.cloneDeep(tree)));
    }
  }, [dispatch, tree]);

  /*===============EVENT HANDLERS STARTS========================== */
  const handleRename = (id) => {
    const renameObj = _.findDeep(tree, (item) => item.id === id, {
      childrenPath: 'children',
    });
    const response = prompt('Please rename', renameObj.value.module);
    // ignore empty string
    if (!response) {
      return;
    }
    renameObj.value.module = response;

    const newTree = _.mapDeep(
      tree,
      (item) =>
        item.id === id
          ? {
              ...item,
              ...renameObj.value,
            }
          : item,
      { childrenPath: 'children' }
    );
    updateTree(newTree[0]);
  };

  const handleDelete = (id) => {
    deleteFromTree(tree, id);
    updateTree(tree);
  };

  const addItemToTree = (itemType, active) => {
    const newItem =
      itemType === 'folder'
        ? {
            id: `root-${Date.now()}`,
            module: `New ${itemType}`,
            children: [],
            collapsed: false,
          }
        : { id: `${Date.now()}`, leaf: true, module: `New ${itemType}` };

    const newTree = _.mapDeep(tree, (item) => {
      const cloneItem = Object.assign({}, item);
      if (cloneItem) {
        if (cloneItem.id === active.id && cloneItem.children) {
          // folder
          cloneItem.children.push(newItem);
        }
      }
      return cloneItem;
    });
    updateTree(newTree[0]);
  };

  const updateTree = async (newTree) => {
    const prevTree = tree;
    setTree((oldTree) => ({ ...oldTree, ...newTree }));
    try {
      if (newTree && Object.keys(newTree).length) {
        await updateFolderTree({
          id: newTree._id,
          tree: _.cloneDeep(newTree),
        });
      }
    } catch (error) {
      alert('Something Unexpected Happened');
      setTree((oldTree) => ({ ...oldTree, ...prevTree }));
    }
  };
  /*===============EVENT HANDLERS ENDS========================== */

  const treeNodeProps = {
    addItemToTree,
    handleDelete,
    handleRename,
    handleClick,
    disableRightClick,
    disableFileAndFolderAddition,
    editableFileIds,
    isAdmin,
  };

  if (!treeData || !Object.keys(treeData).length) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div>
      <Tree
        paddingLeft={20}
        tree={tree}
        onChange={updateTree}
        renderNode={(props) => <TreeNode {...props} {...treeNodeProps} />}
      />
    </div>
  );
};

export default FolderTree;

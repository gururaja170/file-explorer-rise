import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedNode: {},
  selectedUser: {},
  isLoading: false,
  folderTree: {},
};

const folderTreeSlice = createSlice({
  name: 'folderTree',
  initialState,
  reducers: {
    setSelectedNode: (state, { payload }) => {
      state.selectedNode = payload;
    },
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setFolderTree: (state, { payload }) => {
      state.folderTree = payload;
    },
  },
});

export const { setSelectedNode, setSelectedUser, setIsLoading, setFolderTree } =
  folderTreeSlice.actions;

export const getSelectedNode = (state) => state.folderTree.selectedNode;
export const getSelectedUser = (state) => state.folderTree.selectedUser;
export const getIsLoading = (state) => state.folderTree.isLoading;
export const getFolderTree = (state) => state.folderTree.folderTree;
export default folderTreeSlice.reducer;

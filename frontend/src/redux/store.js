import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authenticationApi } from '../apiServices/authService';
import { folderTreeApi } from '../apiServices/treeService';
import { usersApi } from '../apiServices/usersService';
import folderTreeReducer from './folderTree/folderTreeSlice';

export const store = configureStore({
  reducer: {
    folderTree: folderTreeReducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [folderTreeApi.reducerPath]: folderTreeApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(folderTreeApi.middleware)
      .concat(usersApi.middleware),
});

setupListeners(store.dispatch);

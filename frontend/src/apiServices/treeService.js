import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../data/config';

const endpoint = config.apiEndpoint + '/folder-tree';

export const folderTreeApi = createApi({
  reducerPath: 'folderTreeApi',
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }),
  endpoints: (builder) => ({
    getFolderTree: builder.query({
      query: (id) => {
        return {
          url: `${endpoint}/${id}`,
          method: 'GET',
        };
      },
    }),
    updateFolderTree: builder.query({
      query: ({ id, tree }) => {
        return {
          url: `${endpoint}/${id}`,
          method: 'PUT',
          body: tree,
        };
      },
    }),
  }),
});

export const { useGetFolderTreeQuery, useLazyUpdateFolderTreeQuery } =
  folderTreeApi;

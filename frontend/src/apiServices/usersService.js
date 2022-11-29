import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import config from '../data/config';

const endpoint = config.apiEndpoint + '/users';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (role) => {
        return {
          url: role,
          method: 'GET',
        };
      },
      providesTags: ['users'],
    }),
    postUserData: builder.mutation({
      query: ({ userId, sharedFileIds }) => {
        return {
          url: `${userId}/share-files`,
          method: 'POST',
          body: {
            userId,
            sharedFileIds,
          },
        };
      },
      invalidatesTags: ['users'],
    }),
  }),
});

export const { useGetAllUsersQuery, usePostUserDataMutation } = usersApi;

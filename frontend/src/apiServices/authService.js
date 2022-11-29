import omit from 'lodash/omit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../data/config';

const endpoint = config.apiEndpoint + '/auth';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }),
  endpoints: (builder) => ({
    registerUser: builder.query({
      query: (userData) => {
        return {
          url: `${endpoint}/register`,
          method: 'POST',
          body: omit(userData, 'confirmPassword'),
        };
      },
    }),

    loginUser: builder.query({
      query: (loginForm) => {
        return {
          url: `${endpoint}/login`,
          method: 'POST',
          body: loginForm,
        };
      },
    }),
  }),
});

export const { useLazyRegisterUserQuery, useLazyLoginUserQuery } =
  authenticationApi;

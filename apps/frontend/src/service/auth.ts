import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/user' }),
  endpoints: (build) => ({
    login: build.mutation<
      { access_token: string; refresh_token: string },
      { email: string; password: string }
    >({
      query: (args) => ({
        url: '/login',
        method: 'POST',
        body: args,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const data = (await queryFulfilled).data;
          localStorage.setItem('access_token', data.access_token);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registration: build.mutation<
      { access_token: string; refresh_token: string },
      { email: string; password: string }
    >({
      query: (args) => ({
        url: '/registration',
        method: 'POST',
        body: args,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const data = (await queryFulfilled).data;
          localStorage.setItem('access_token', data.access_token);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: (_) => ({
        url: '/logout',
        method: 'POST',
      }),
      async onQueryStarted(_) {
        try {
          localStorage.removeItem('access_token');
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

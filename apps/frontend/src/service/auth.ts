import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { basketAPI } from './basket';
import { userAPI } from './user';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth' }),
  tagTypes: ['Basket'],
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
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const data = (await queryFulfilled).data;
          localStorage.setItem('access_token', data.access_token);
          dispatch(basketAPI.util.invalidateTags(['Basket']));
          dispatch(userAPI.util.invalidateTags(['User']));
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
      async onQueryStarted(_, { dispatch }) {
        try {
          localStorage.removeItem('access_token');
          dispatch(userAPI.util.invalidateTags(['User']));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refreshToken: build.mutation<
      {
        access_token: string;
        refresh_token: string;
      },
      void
    >({
      query: () => ({
        url: 'refresh',
        method: 'POST',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const data = (await queryFulfilled).data;
          localStorage.setItem('access_token', data.access_token);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { basketAPI } from './basket';
import { baseQueryWithReauth } from './initial';
import { userAPI } from './user';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Basket'],
  
  endpoints: (build) => ({
    login: build.mutation<
      { access_token: string; refresh_token: string },
      { email: string; password: string }
    >({
      query: (args) => ({
        url: '/auth/login',
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
      }
    }),
    registration: build.mutation<
      { access_token: string; refresh_token: string },
      { email: string; password: string }
    >({
      query: (args) => ({
        url: '/auth/registration',
        method: 'POST',
        body: args,
      }),
      async onQueryStarted(_, { queryFulfilled,dispatch }) {
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
    test: build.mutation<'heads' | 'tails', void>({
      queryFn(arg, queryApi, extraOptions, baseQuery) {
        const randomVal = Math.random()
        console.log('test work')
        if (randomVal < 0.45) {
          return { data: 'heads' }
        }
        if (randomVal < 0.9) {
          return { data: 'tails' }
        }
        return { error: { status: 500, statusText: 'Internal Server Error', data: "Coin landed on it's edge!" } }
      }
    }),
    logout: build.mutation<void, void>({
      query: (_) => ({
        url: '/auth/logout',
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
        url: '/auth/refresh',
        method: 'POST',
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
  }),
});

import { User } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { updateUserDto } from '@store/interface';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/user',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    get: build.query<User, null>({
      query: (_) => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    update: build.mutation<
      { access_token: string; refresh_token: string },
      updateUserDto
    >({
      query: (args) => ({
        url: '/',
        method: 'PATCH',
        body: args,
      }),
      transformResponse: (response: {
        access_token: string;
        refresh_token: string;
      }) => {
        localStorage.setItem('access_token', response.access_token);
        return response;
      },
      invalidatesTags: ['User'],
    }),
    updatePassword: build.mutation<
      void,
      { newPassword: string; oldPassword: string }
    >({
      query: (args) => ({
        url: '/password',
        method: 'PATCH',
        body: args,
      }),
      invalidatesTags: ['User'],
    }),
    delete: build.mutation<void, { password: string }>({
      query: (args) => ({
        url: '/',
        method: 'DELETE',
        body: args,
      }),
      invalidatesTags: ['User'],
      transformResponse: (_) => {
        localStorage.removeItem('access_token');
      },
    }),
  }),
});

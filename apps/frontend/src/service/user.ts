import { User } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { updateUserDto } from '@store/interface';
import { baseQueryWithReauth } from './initial';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (build) => ({
    get: build.query<User, null>({
      query: (_) => ({
        url: 'user/',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    update: build.mutation<
      { access_token: string; refresh_token: string },
      updateUserDto
    >({
      query: (args) => ({
        url: 'user/',
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
        url: 'user/password',
        method: 'PATCH',
        body: args,
      }),
      invalidatesTags: ['User'],
    }),
    delete: build.mutation<void, { password: string }>({
      query: (args) => ({
        url: 'user/',
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

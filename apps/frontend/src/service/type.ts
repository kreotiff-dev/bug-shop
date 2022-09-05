import { Type } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const typeAPI = createApi({
  reducerPath: 'typeAPI',
  tagTypes: ['Type'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/type',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    create: build.mutation<void, string>({
      query: (args) => ({
        url: '/',
        method: 'POST',
        body: { name: args },
      }),
      invalidatesTags: ['Type'],
    }),
    get: build.query<{ types: Type[]; count: number }, string | void>({
      query: (query) => ({
        url: `/${query ? query : ''}`,
      }),
      providesTags: ['Type'],
    }),
    delete: build.mutation<void, { id: number }>({
      query: (args) => ({
        url: `/${args.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Type'],
    }),
    update: build.mutation<void, { id: number; name: string }>({
      query: (args) => ({
        url: `/${args.id}`,
        method: 'PATCH',
        body: { name: args.name },
      }),
      invalidatesTags: ['Type'],
    }),
  }),
});

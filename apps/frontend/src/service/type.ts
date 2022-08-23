import { Type } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const typeAPI = createApi({
  reducerPath: 'typeAPI',
  tagTypes: ['Type'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/type' }),
  endpoints: (build) => ({
    create: build.mutation<void, string>({
      query: (args) => ({
        url: '/',
        method: 'POST',
        body: { name: args },
      }),
      invalidatesTags: ['Type'],
    }),
    get: build.query<Type[], void>({
      query: (_) => ({
        url: '/',
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

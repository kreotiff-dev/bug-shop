import { Brand } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const brandAPI = createApi({
  reducerPath: 'brandAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/brand' }),
  tagTypes: ['Brand'],
  endpoints: (build) => ({
    create: build.mutation<void, string>({
      query: (args) => ({
        url: '/',
        method: 'POST',
        body: { name: args },
      }),
      invalidatesTags: ['Brand'],
    }),
    get: build.query<Brand[], void>({
      query: (_) => ({
        url: '/',
      }),
      providesTags: ['Brand'],
    }),
    getById: build.query<Brand, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    delete: build.mutation<void, { id: number }>({
      query: (args) => ({
        url: `/${args.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Brand'],
    }),
    update: build.mutation<void, { id: number; name: string }>({
      query: (args) => ({
        url: `/${args.id}`,
        method: 'PATCH',
        body: { name: args.name },
      }),
      invalidatesTags: ['Brand'],
    }),
  }),
});

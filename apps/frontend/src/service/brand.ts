import { Brand } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from './initial';

export const brandAPI = createApi({
  reducerPath: 'brandAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Brand'],
  endpoints: (build) => ({
    create: build.mutation<void, string>({
      query: (args) => ({
        url: '/brand',
        method: 'POST',
        body: { name: args },
      }),
      invalidatesTags: ['Brand'],
    }),
    get: build.query<{ brands: Brand[]; count: number }, string | void>({
      query: (query) => ({
        url: `/brand${query? query : ''}`,
      }),
      providesTags: ['Brand'],
    }),
    getById: build.query<Brand, number>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: 'GET',
      }),
    }),
    delete: build.mutation<void, { id: number }>({
      query: (args) => ({
        url: `/brand/${args.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Brand'],
    }),
    update: build.mutation<void, { id: number; name: string }>({
      query: (args) => ({
        url: `/brand/${args.id}`,
        method: 'PATCH',
        body: { name: args.name },
      }),
      invalidatesTags: ['Brand'],
    }),
  }),
});

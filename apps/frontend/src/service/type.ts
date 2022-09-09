import { Type } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from './initial';

export const typeAPI = createApi({
  reducerPath: 'typeAPI',
  tagTypes: ['Type'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    create: build.mutation<void, string>({
      query: (args) => ({
        url: '/type',
        method: 'POST',
        body: { name: args },
      }),
      invalidatesTags: ['Type'],
    }),
    get: build.query<{ types: Type[]; count: number }, string | void>({
      query: (query) => ({
        url: `/type${query ? query : ''}`,
      }),
      providesTags: ['Type'],
    }),
    delete: build.mutation<void, { id: number }>({
      query: (args) => ({
        url: `/type/${args.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Type'],
    }),
    update: build.mutation<void, { id: number; name: string }>({
      query: (args) => ({
        url: `/type/${args.id}`,
        method: 'PATCH',
        body: { name: args.name },
      }),
      invalidatesTags: ['Type'],
    }),
  }),
});

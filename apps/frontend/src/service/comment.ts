import { Comment } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { commentDto, updateCommentDto } from '@store/interface';
import { baseQueryWithReauth } from './initial';

export const commentAPI = createApi({
  reducerPath: 'commentAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Comments', 'Comment'],
  endpoints: (build) => ({
    create: build.mutation<Comment, commentDto>({
      query: (args) => ({
        url: '/comment',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['Comments'],
    }),
    getCommentsDevice: build.query<Comment[], number>({
      query: (id) => ({
        url: `/comment/device/${id}`,
      }),
      providesTags: ['Comments'],
    }),
    getCommentById: build.query<Comment, number>({
      query: (id) => ({
        url: `/comment/${id}`,
      }),
      providesTags: ['Comment'],
    }),
    update: build.mutation<void, { id: number } & updateCommentDto>({
      query: (args) => ({
        url: `/comment/${args.id}`,
        method: 'PATCH',
        body: { comment: args.comment },
      }),
      invalidatesTags: ['Comments'],
    }),
    delete: build.mutation<void, number>({
      query: (id) => ({
        url: `/comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments', 'Comment'],
    }),
  }),
});

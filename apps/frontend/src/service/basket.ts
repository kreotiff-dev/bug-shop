import { BasketDevice } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const basketAPI = createApi({
  reducerPath: 'basketAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/basket',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Basket'],
  endpoints: (build) => ({
    get: build.query<BasketDevice[], void>({
      query: (_) => ({
        url: '/device',
      }),
      providesTags: ['Basket'],
    }),
    getPrice: build.query<number, void>({
      query: (_) => ({
        url: '/price',
      }),
      providesTags: ['Basket'],
    }),
    addDevice: build.mutation<void, { idDevice: number }>({
      query: (args) => ({
        url: '/add-device',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['Basket'],
    }),
    deleteDevice: build.mutation<void, { idDevice: number }>({
      query: (args) => ({
        url: '/',
        method: 'DELETE',
        body: args,
      }),
      invalidatesTags: ['Basket'],
    }),
    updateDevice: build.mutation<void, { count: number; idDevice: number }>({
      query: (args) => ({
        url: '/',
        method: 'PATCH',
        body: args,
      }),
      invalidatesTags: ['Basket'],
    }),
    isBasket: build.query<boolean, { idDevice: number }>({
      query: (args) => ({
        url: '/is-basket',
        method: 'POST',
        body: args,
      }),

      providesTags: ['Basket'],
    }),
  }),
});

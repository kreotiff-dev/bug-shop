import { BasketDevice } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from './initial';

export const basketAPI = createApi({
  reducerPath: 'basketAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Basket'],
  endpoints: (build) => ({
    get: build.query<BasketDevice[], void>({
      query: (_) => ({
        url: '/basket/device',
      }),
      providesTags: ['Basket'],
    }),
    getPrice: build.query<number, void>({
      query: (_) => ({
        url: '/basket/price',
      }),
      providesTags: ['Basket'],
    }),
    addDevice: build.mutation<void, { idDevice: number }>({
      query: (args) => ({
        url: '/basket/add-device',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['Basket'],
    }),
    deleteDevice: build.mutation<void, { idDevice: number }>({
      query: (args) => ({
        url: '/basket',
        method: 'DELETE',
        body: args,
      }),
      invalidatesTags: ['Basket'],
    }),
    updateDevice: build.mutation<void, { count: number; idDevice: number }>({
      query: (args) => ({
        url: '/basket',
        method: 'PATCH',
        body: args,
      }),
      invalidatesTags: ['Basket'],
    }),
    isBasket: build.query<boolean, { idDevice: number }>({
      query: (args) => ({
        url: '/basket/is-basket',
        method: 'POST',
        body: args,
      }),

      providesTags: ['Basket'],
    }),
  }),
});

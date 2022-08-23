import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { CreateDeviceDto } from '@store/interface';
import { Device, Type, Brand, DeviceInfo } from '@prisma/client';

export const deviceAPI = createApi({
  reducerPath: 'deviceAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/device',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Device', 'Brand', 'Type', 'DeviceInfo'],
  endpoints: (build) => ({
    create: build.mutation<void, CreateDeviceDto>({
      query: (args) => ({
        url: '/',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['Device'],
    }),
    get: build.query<Device[], void>({
      query: (_) => ({
        url: '/',
      }),
      providesTags: ['Device'],
    }),
    getById: build.query<Device, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['Device'],
    }),
    getFullInfo: build.query<
      { device: Device; brand: Brand; type: Type; info: DeviceInfo },
      number
    >({
      query: (id) => ({
        url: `/full/${id}`,
        method: 'GET',
      }),
      providesTags: ['Device', 'Brand', 'Type', 'DeviceInfo'],
    }),
  }),
});

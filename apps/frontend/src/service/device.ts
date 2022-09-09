import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { UpdateInfoDeviceDto } from '@store/interface';
import { Device, Type, Brand, DeviceInfo } from '@prisma/client';
import { basketAPI } from './basket';
import { baseQueryWithReauth } from './initial';

export const deviceAPI = createApi({
  reducerPath: 'deviceAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Device', 'Brand', 'Type', 'DeviceInfo', 'Basket'],
  endpoints: (build) => ({
    create: build.mutation<void, FormData>({
      query: (data) => ({
        url: '/device',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Device'],
    }),
    update: build.mutation<void, { data: FormData; id: number }>({
      query: (args) => ({
        url: `/device/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['Device', 'DeviceInfo'],
    }),
    get: build.query<{ devices: Device[]; count: number }, string | void>({
      query: (args) => ({
        url: '/device/' + args,
      }),
      providesTags: ['Device'],
    }),
    getInfo: build.query<UpdateInfoDeviceDto[], number>({
      query: (id) => ({
        url: `/device/info/${id}`,
      }),
      providesTags: ['DeviceInfo'],
    }),
    getById: build.query<Device, number>({
      query: (id) => ({
        url: `/device/${id}`,
        method: 'GET',
      }),
      providesTags: ['Device'],
    }),
    getFullInfo: build.query<
      { device: Device; brand: Brand; type: Type; info: DeviceInfo[] },
      number
    >({
      query: (id) => ({
        url: `/device/full/${id}`,
        method: 'GET',
      }),
      providesTags: ['Device', 'Brand', 'Type', 'DeviceInfo'],
    }),
    delete: build.mutation<void, number>({
      query: (id) => ({
        url: `/device/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(basketAPI.util.invalidateTags(['Basket']));
          dispatch(basketAPI.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ['Device', 'DeviceInfo'],
    }),
  }),
});

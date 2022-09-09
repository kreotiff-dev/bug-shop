import { AuthContext } from './../context/index';
import { useContext } from 'react';
import { authAPI } from './auth';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';


export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
  
  export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {
    const result = await baseQuery(args, api, extraOptions);
  
    if (result.error && result.error.status === 401) {
      localStorage.removeItem('access_token')
        // const refreshResult = await baseQuery({
        //   url: 'auth/refresh/',
        //   method: 'POST'
        // }, api, extraOptions);
  
        // if (refreshResult.data) {
        //     console.log(refreshResult.data);
            
  
        //     // retry the initial query
        //     result = await baseQuery(args, api, extraOptions);
        // } else {
        //     api.dispatch(authAPI.useLogoutMutation);
        // }
    }
    return result;
  };
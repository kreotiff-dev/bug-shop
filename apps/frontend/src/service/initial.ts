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
    credentials: 'include'
  });
  
  export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions);
    
    if (result.error && result.error.status === 401 && localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token')
        const refreshResult = await baseQuery({
          url: 'auth/refresh/',
          method: 'POST',
        }, api, extraOptions);
  
        if (refreshResult.data) {
            const stringRes = JSON.stringify(refreshResult.data);
            const access_token:string = JSON.parse(stringRes).access_token;
            localStorage.setItem('access_token',access_token)
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(authAPI.endpoints.logout.initiate())
        }
    }
    return result;
  };
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI } from '../service/auth';
import { brandAPI } from '../service/brand';
import { typeAPI } from './../service/type';
import { deviceAPI } from './../service/device';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [typeAPI.reducerPath]: typeAPI.reducer,
  [brandAPI.reducerPath]: brandAPI.reducer,
  [deviceAPI.reducerPath]: deviceAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPI.middleware,
        typeAPI.middleware,
        brandAPI.middleware,
        deviceAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

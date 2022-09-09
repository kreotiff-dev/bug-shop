import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI } from '../service/auth';
import { brandAPI } from '../service/brand';
import { typeAPI } from './../service/type';
import { deviceAPI } from './../service/device';
import { basketAPI } from './../service/basket';
import { userAPI } from '../service/user';



const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [typeAPI.reducerPath]: typeAPI.reducer,
  [brandAPI.reducerPath]: brandAPI.reducer,
  [deviceAPI.reducerPath]: deviceAPI.reducer,
  [basketAPI.reducerPath]: basketAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPI.middleware,
        typeAPI.middleware,
        brandAPI.middleware,
        deviceAPI.middleware,
        basketAPI.middleware,
        userAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

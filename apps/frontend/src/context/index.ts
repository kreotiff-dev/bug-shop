import { createContext } from 'react';
export const AuthContext = createContext({
  isAuth: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAuth: (state: boolean) => {},
});

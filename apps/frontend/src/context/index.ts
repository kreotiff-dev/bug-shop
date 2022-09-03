import { createContext } from 'react';

interface AuthType {
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
}

const defaultValue: AuthType = {
  isAuth: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAuth: (state: boolean) => {},
};

export const AuthContext = createContext<AuthType>(defaultValue);

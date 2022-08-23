import { $authHost, $host } from './';
import jwt_decode from 'jwt-decode';

export const registration = async (email: string, password: string) => {
  const { data } = await $host.post('/user/registration', {
    email,
    password,
    role: 'ADMIN',
  });
  localStorage.setItem('access_token', data.access_token);
  return jwt_decode(data.access_token);
};

export const login = async (email: string, password: string) => {
  const { data } = await $host.post('/user/login', { email, password });
  localStorage.setItem('access_token', data.access_token);
  return jwt_decode(data.access_token);
};

export const check = async () => {
  const { data } = await $authHost.get('/user/refresh');
  localStorage.setItem('access_token', data.access_token);
  return jwt_decode(data.access_token);
};

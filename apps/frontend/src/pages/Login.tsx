import * as React from 'react';
import { LoginForm } from '../components/loginForm';
import { Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { LOGIN_ROUTE } from '../utils/const';

export function Login() {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const token = localStorage.getItem('access_token');
  if (token) {
    return <Navigate to="/shop" />;
  }
  return (
    <Layout>
      <div className="login">
        <h1 className="h1 title">{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
        <LoginForm />;
      </div>
    </Layout>
  );
}

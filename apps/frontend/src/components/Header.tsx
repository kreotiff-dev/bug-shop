import { Button, Layout } from 'antd';
import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../service/auth';
import { LOGIN_ROUTE } from '../utils/const';
import { AuthContext } from './../context/index';
import { ADMIN_ROUTE } from './../utils/const';

const { Header: AHeader } = Layout;

const Header = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [logout] = authAPI.useLogoutMutation();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const isLogin = location.pathname === LOGIN_ROUTE;
  const onClick = () => {
    // localStorage.removeItem('access_token');
    // navigate(LOGIN_ROUTE);
    logout();
    setIsAuth(false);
  };
  return (
    <AHeader>
      <Link to={'/shop'}>Shop</Link>
      <div>
        {isAuth ? (
          <>
            <Link to={ADMIN_ROUTE}>Админ</Link>
            <Link to={LOGIN_ROUTE} onClick={onClick}>
              Выход
            </Link>
          </>
        ) : isLogin ? (
          <Link to={'/registration'}>Регистрация</Link>
        ) : (
          <Link to={'/login'}>Вход</Link>
        )}
      </div>
    </AHeader>
  );
};

export default Header;

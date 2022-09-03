import { Layout } from 'antd';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/const';
import { AuthContext } from './../context/index';
import Basket from './../assets/Basket';
import ProfileDropdown from './Profile/Dropdown';

const { Header: AHeader } = Layout;

const Header = () => {
  const location = useLocation();
  const { isAuth } = useContext(AuthContext);
  const isLogin = location.pathname === LOGIN_ROUTE;
  return (
    <AHeader className="header">
      <Link to={'/shop'}>Shop</Link>
      <div className="header__nav">
        {isAuth ? (
          <>
            <Link to={'/basket'} className="d-i-flex items-center mr-20">
              <Basket />
            </Link>
            <ProfileDropdown />
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

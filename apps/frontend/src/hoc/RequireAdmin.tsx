import { Role } from '@prisma/client';
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context';
import { userAPI } from '../service/user';

const Require = () => {
  const token = localStorage.getItem('access_token');
  const { data: user } = userAPI.useGetQuery(null, {
    skip: token ? false : true,
  });
  const { isAuth } = useContext(AuthContext);

  const location = useLocation();
  const adminPath = location.pathname.slice(0, 6) === '/admin';
  const basketPath = location.pathname.slice(0, 7) === '/basket';
  // if (!isAuth && basketPath) {
  //   return <Navigate to={'/shop'} />;
  // }
  // if (adminPath && !isAuth) {
  //   return <Navigate to={'/shop'} />;
  // }
  return <Outlet />;
};

export default Require;

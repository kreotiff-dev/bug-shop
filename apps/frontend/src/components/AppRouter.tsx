import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './../utils/const';
import Shop from './../pages/Shop';
import AdminPanel from './../pages/AdminPanel';
import AdminMain from './Admin/Main';
import AdminType from './Admin/Type';
import AdminDevice from './Admin/Device';
import AdminBrand from './Admin/Brand';
import Device from '../pages/Device';
import Basket from './../pages/Basket';
import Require from '../hoc/RequireAdmin';
import Profile from '../pages/Profile';

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route element={<Require />}> */}
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={REGISTRATION_ROUTE} element={<Login />} />
      <Route path={'/shop'} element={<Shop />} />
      <Route path="/shop/:id" element={<Device />} />
      <Route path="/basket" element={<Basket />} />
      <Route path={ADMIN_ROUTE} element={<AdminPanel />}>
        <Route index element={<AdminMain />} />
        <Route path="type" element={<AdminType />} />
        <Route path="device" element={<AdminDevice />} />
        <Route path="brand" element={<AdminBrand />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      {/* </Route> */}
      <Route path="*" element={<Navigate to={'/shop'} />} />
    </Routes>
  );
};

export default AppRouter;

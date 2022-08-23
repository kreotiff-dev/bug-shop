import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './../utils/const';
import Shop from './../pages/Shop';
import AdminPanel from './../pages/AdminPanel';
import AdminMain from './Admin/Main';
import AdminType from './Admin/Type';
import AdminDevice from './Admin/Device';
import AdminBrand from './Admin/Brand';
import DeviceInfo from './Admin/DeviceInfo';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={REGISTRATION_ROUTE} element={<Login />} />
      <Route path={SHOP_ROUTE} element={<Shop />} />
      <Route path={ADMIN_ROUTE} element={<AdminPanel />}>
        <Route index element={<AdminMain />} />
        <Route path="type" element={<AdminType />} />
        <Route path="device" element={<AdminDevice />} />
        <Route path="device/:id" element={<DeviceInfo />} />
        <Route path="brand" element={<AdminBrand />} />
      </Route>
      <Route path="*" element={<Navigate to={'/shop'} />} />
    </Routes>
  );
};

export default AppRouter;

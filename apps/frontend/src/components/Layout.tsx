import React, { useContext } from 'react';
import { Layout as ALayout } from 'antd';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context';
import { SHOP_ROUTE } from '../utils/const';
import { ADMIN_ROUTE } from './../utils/const';
import ShopSidebar from './Sidebar/ShopSidebar';
import AdminSidebar from './Sidebar/AdminSidebar';

const { Content } = ALayout;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();
  const adminPath = location.pathname.slice(0, 6) === '/admin';
  return (
    <ALayout>
      <Header />
      <ALayout>
        {location.pathname === SHOP_ROUTE && <ShopSidebar />}
        {adminPath && <AdminSidebar />}
        <Content>{children}</Content>
      </ALayout>
    </ALayout>
  );
};

export default Layout;

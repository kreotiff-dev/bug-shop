import React, { useContext } from 'react';
import { Layout as ALayout } from 'antd';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context';
import AdminSidebar from './Sidebar/AdminSidebar';

const { Content } = ALayout;

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();
  const adminPath = location.pathname.slice(0, 6) === '/admin';
  return (
    <ALayout className={`${className || ''} main`}>
      <Header />
      <ALayout>
        {adminPath && <AdminSidebar />}
        <Content>{children}</Content>
      </ALayout>
    </ALayout>
  );
};

export default Layout;

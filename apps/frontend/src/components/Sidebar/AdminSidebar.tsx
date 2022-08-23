import React from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const { Sider } = Layout;

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <Sider>
      <Menu
        mode="inline"
        defaultSelectedKeys={['/admin']}
        style={{ height: '100%' }}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin">
          <Link to={'/admin'}>Главная</Link>
        </Menu.Item>
        <Menu.Item key="/admin/device">
          <Link to={'/admin/device'}>Устройства</Link>
        </Menu.Item>
        <Menu.Item key="/admin/brand">
          <Link to={'/admin/brand'}>Бренды</Link>
        </Menu.Item>
        <Menu.Item key="/admin/type">
          <Link to={'/admin/type'}>Категории</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;

import React from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const { Sider } = Layout;

const AdminSidebar = () => {
  const location = useLocation();
  const items: ItemType[] = [
    {
      key: '/admin',
      label: <Link to={'/admin'}>Главная</Link>,
    },
    {
      key: '/admin/device',
      label: <Link to={'/admin/device'}>Устройства</Link>,
    },
    {
      key: '/admin/brand',
      label: <Link to={'/admin/brand'}>Бренды</Link>,
    },
    {
      key: '/admin/type',
      label: <Link to={'/admin/type'}>Категории</Link>,
    },
  ];
  return (
    <Sider>
      <Menu
        mode="inline"
        defaultSelectedKeys={['/admin']}
        style={{ height: '100%' }}
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Sider>
  );
};

export default AdminSidebar;

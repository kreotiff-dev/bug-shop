import { Role } from '@prisma/client';
import { Dropdown, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context';
import { authAPI } from '../../service/auth';
import { userAPI } from '../../service/user';
import UpdatePassword from '../Modal/UpdatePassword';
import DeleteUser from './../Modal/DeleteUser';

const ProfileDropdown = () => {
  const [logout] = authAPI.useLogoutMutation();
  const [isPassword, setIsPassword] = React.useState<boolean>(false);
  const [isDelete, setIsDelete] = React.useState<boolean>(false);
  const token = localStorage.getItem('access_token');
  const { data: user, isLoading } = userAPI.useGetQuery(null, {
    skip: token ? false : true,
  });
  const { setIsAuth } = useContext(AuthContext);
  const onClick = () => {
    logout();
    setIsAuth(false);
  };
  const updatePassword = () => {
    setIsPassword(true);
  };
  const deleteAccount = () => {
    setIsDelete(true);
  };
  const defaultItemsMenu: ItemType[] = [
    {
      key: '2',
      label: <Link to="/profile">Профиль</Link>,
    },
    {
      key: '3',
      label: 'Настройки',
      icon: false,
      itemIcon: false,
      expandIcon: false,
      children: [
        {
          key: '3-1',
          label: <span onClick={updatePassword}>Изменить пароль</span>,
        },
        {
          key: '3-2',
          label: <span onClick={deleteAccount}>Удалить аккаунт</span>,
        },
      ],
    },
    {
      key: '4',
      label: (
        <Link to={'/shop'} onClick={onClick}>
          Выход
        </Link>
      ),
    },
  ];

  const adminItemsMenu = [
    {
      key: '1',
      label: <Link to="/admin">Админ</Link>,
    },
    ...defaultItemsMenu,
  ];
  if (isLoading) {
    return null;
  }
  const menu = (
    <Menu
      items={user?.role === Role.ADMIN ? adminItemsMenu : defaultItemsMenu}
    />
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow
        className="profile__dropdown"
      >
        <span className="profile__dropdown-title">Профиль</span>
      </Dropdown>
      {isPassword && (
        <UpdatePassword visible={isPassword} setIsVisible={setIsPassword} />
      )}
      {isDelete && <DeleteUser visible={isDelete} setIsVisible={setIsDelete} />}
    </>
  );
};

export default ProfileDropdown;

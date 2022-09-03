import React from 'react';
import Layout from '../components/Layout';
import UpdateUser from '../components/Modal/UpdateUser';
import { userAPI } from './../service/user';
import { formateDate, formatSex } from '../utils/formatData';
import { formatPhone } from './../utils/formatData';

const Profile = () => {
  const { data: user, isLoading } = userAPI.useGetQuery(null);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  if (isLoading) return null;

  return (
    <Layout>
      <div className="profile">
        <div className="profile__header">
          <div className="profile__img">
            <img src="http://dummyimage.com/120" alt="" />
          </div>
          <div className="profile__title">
            <h2 className="profile__name">
              {user?.surname || 'Фамилия'} {user?.name || 'Имя'}
            </h2>
            <h3 className="profile__update" onClick={(_) => setIsModal(true)}>
              Редактировать
            </h3>
          </div>
        </div>
        <div className="profile__list">
          <div className="profile__item">
            <h3 className="profile__item-title">Email</h3>
            <p className="profile__item-desc">{user?.email || 'Не указано'}</p>
          </div>
          <div className="profile__item">
            <h3 className="profile__item-title">Телефон</h3>
            <p className="profile__item-desc">
              {user?.phone ? formatPhone(user?.phone) : 'Не указано'}
            </p>
          </div>
          <div className="profile__item">
            <h3 className="profile__item-title">Пол</h3>
            <p className="profile__item-desc">
              {user?.sex ? formatSex(user.sex) : 'Не указано'}
            </p>
          </div>
          <div className="profile__item">
            <h3 className="profile__item-title">Дата рождения</h3>
            <p className="profile__item-desc">
              {user?.bithday ? formateDate(user.bithday) : 'Не указано'}
            </p>
          </div>
        </div>
      </div>
      {user && isModal ? (
        <UpdateUser visible={isModal} setIsVisible={setIsModal} user={user} />
      ) : null}
    </Layout>
  );
};

export default Profile;

import { Button, Col, Row, Table, message } from 'antd';
import React from 'react';
import jwt from 'jwt-decode';
import Layout from './../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { deviceAPI } from './../service/device';
import { basketAPI } from './../service/basket';
import { commentAPI } from '../service/comment';
import CommentList from '../components/CommentList';
import { Role } from '@prisma/client';
import CommentModal from '../components/Modal/Comment';

type DataTable = {
  key: number;
  title: string;
  description: string;
};

const columns = [
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Значение',
    dataIndex: 'description',
    key: 'description',
  },
];

const Device = () => {
  const id = useParams()['id'] || '';
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token') || '';
  const { data } = deviceAPI.useGetFullInfoQuery(parseInt(id));
  const { data: CommentsList } = commentAPI.useGetCommentsDeviceQuery(
    parseInt(id)
  );
  const user: {
    sub: number;
    email: string;
    role: Role;
  } | null = token ? jwt(token) : null;
  const isComment =
    user !== null &&
    CommentsList?.find((item) => item.userId === user?.sub) === undefined
      ? false
      : true;
  const [addBasketDevice] = basketAPI.useAddDeviceMutation();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const { data: isBasket } = basketAPI.useIsBasketQuery(
    {
      idDevice: parseInt(id),
    },
    {
      skip: token ? false : true,
    }
  );

  const dataTable: DataTable[] = [];
  data?.info.forEach((item) => {
    dataTable.push({
      key: item.id,
      title: item.title,
      description: item.description,
    });
  });

  const onClick = () => {
    if (isBasket) {
      navigate('/basket');
    } else {
      addBasketDevice({ idDevice: parseInt(id) })
        .unwrap()
        .then(() => {
          message.success('Устройство добавленно');
        })
        .catch((e) => {
          message.error(e.data.message);
        });
    }
  };
  return (
    <Layout>
      <Row>
        <Col span={8} offset={4} style={{ height: '200px' }}>
          <img
            style={{ height: '100%' }}
            src={`${window.location.protocol}//${window.location.hostname}:3000/${data?.device.img}`}
            alt=""
          />
        </Col>
        <Col span={8}>
          <h2>
            {data?.brand.name} {data?.device.name}
          </h2>
          <div>Рейтинг: {data?.device.rating}</div>
          <p>Стоимость: {data?.device.price} руб.</p>
          {token && (
            <>
              <Button onClick={onClick}>
                {isBasket ? 'Перейти в корзину' : 'Добавить в корзину'}
              </Button>
              {!isComment && (
                <Button onClick={() => setIsVisible(true)}>
                  Оставить отзыв
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={4}>
          <h2>Характеристики</h2>
          <Table
            dataSource={dataTable}
            pagination={false}
            columns={columns}
            showHeader={false}
            bordered
          />
        </Col>
      </Row>
      {CommentsList && (
        <Row>
          <Col span={8} offset={4}>
            {CommentsList.length ? (
              <>
                <h2>Отзывы</h2>
                <CommentList list={CommentsList} />
              </>
            ) : (
              <h2>Отзывы отсутствуют</h2>
            )}
          </Col>
        </Row>
      )}
      <CommentModal setIsVisible={setIsVisible} visible={isVisible} />
    </Layout>
  );
};

export default Device;

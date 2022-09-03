import { Button, Col, Row } from 'antd';
import React from 'react';
import BasketList from '../components/BasketList';
import Layout from '../components/Layout';
import { basketAPI } from './../service/basket';

const Basket = () => {
  const { data } = basketAPI.useGetQuery();
  const { data: price } = basketAPI.useGetPriceQuery();
  return (
    <Layout>
      <div className="basket">
        <div className="basket__body">
          {data?.length ? (
            <>
              <h2>Корзина</h2>
              <BasketList devices={data} />
            </>
          ) : (
            <h2>Корзина пуста</h2>
          )}
        </div>
        <div className="basket__sidebar">
          <div className="basket__sidebar-item">
            <h2>Итого:</h2>
            <h2>{price} ₽</h2>
          </div>
          <Button type="primary" className="basket__sidebar-btn">
            Оформить
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Basket;

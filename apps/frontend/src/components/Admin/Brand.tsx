import React, { useState } from 'react';
import { Button, Col, Input, message, Modal, Row } from 'antd';
import BrandList from './BrandList';
import { brandAPI } from '../../service/brand';
import { Brand } from '@prisma/client';

const AdminBrand = () => {
  const { data: brands, isLoading } = brandAPI.useGetQuery();
  const [create] = brandAPI.useCreateMutation();
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState<string>('');

  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }

  const onClick = () => {
    setIsModal(true);
  };

  const handleOk = () => {
    setIsModal(false);
    create(name)
      .unwrap()
      .then(() => {
        message.success('Бренд добавлен');
        setName('');
      })
      .catch((e) => {
        message.error(e.data.message);
        setName('');
      });
  };

  const handleCancel = () => {
    setIsModal(false);
    setName('');
  };
  return (
    <>
      <h1 className="h1 title">Бренд</h1>
      <Row>
        <Col span={12} offset={6}>
          <Button onClick={onClick}>Создать</Button>
          {brands ? <BrandList brands={brands} /> : <h2>Список пуст</h2>}
        </Col>
      </Row>
      <Modal
        title="Создание"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Введите название бренда"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default AdminBrand;

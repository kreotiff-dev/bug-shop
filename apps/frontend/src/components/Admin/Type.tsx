import { Button, Col, Input, message, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { typeAPI } from './../../service/type';
import TypeList from './TypeList';

const AdminType = () => {
  const { data: types, isLoading } = typeAPI.useGetQuery();
  const [create] = typeAPI.useCreateMutation();
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState<string>('');

  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }
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
  const onClick = () => {
    setIsModal(true);
  };
  const handleCancel = () => {
    setIsModal(false);
    setName('');
  };
  return (
    <>
      <h1 className="h1 title">Категории</h1>
      <Row>
        <Col span={12} offset={6}>
          <Button onClick={onClick}>Создать</Button>
          {types ? <TypeList types={types} /> : <h2>Список пуст</h2>}
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

export default AdminType;

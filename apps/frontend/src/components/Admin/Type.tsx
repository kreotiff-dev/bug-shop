import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { rules } from '../../utils/rules';
import { typeAPI } from './../../service/type';
import TypeList from './TypeList';

const AdminType = () => {
  const [form] = Form.useForm();
  const { data: types, isLoading } = typeAPI.useGetQuery();
  const [create] = typeAPI.useCreateMutation();
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState<string>('');

  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }
  const handleOk = () => {
    form.submit();
  };
  const onClick = () => {
    setIsModal(true);
  };
  const handleCancel = () => {
    setIsModal(false);
    form.resetFields();
  };
  const submit = () => {
    create(name)
      .unwrap()
      .then(() => {
        message.success('Бренд добавлен');
        setIsModal(false);
        form.resetFields();
      })
      .catch((e) => {
        message.error(e.data.message);
      });
  }
  return (
    <>
      <h1 className="h1 title">Категории</h1>
      <Row>
        <Col span={12} offset={6}>
          <Button onClick={onClick}>Создать</Button>
          {types ? <TypeList types={types.types} /> : <h2>Список пуст</h2>}
        </Col>
      </Row>
      <Modal
        title="Создание"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={submit}>
          <Form.Item name={'name'} rules={[rules.required()]}>
            <Input
              placeholder="Введите название бренда"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminType;

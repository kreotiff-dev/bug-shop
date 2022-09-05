import { Button, Col, Form, Input, message, Modal, Pagination, Row } from 'antd';
import React, { useState } from 'react';
import { rules } from '../../utils/rules';
import { typeAPI } from './../../service/type';
import TypeList from './TypeList';

const AdminType = () => {
  const [page, setPage] = React.useState(1);
  const [form] = Form.useForm();
  const { data, isLoading } = typeAPI.useGetQuery(`?page=${page}`);
  const [create] = typeAPI.useCreateMutation();
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState<string>('');
  const totalCount = data && data.count ? data.count : 0;
  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }
  const handleOk = () => {
    form.submit();
  };
  const onChange = (page: number) => {
    setPage(page);
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
      <Row className='type'>
        <Col span={12} offset={6} className='type__btn'>
          <Button onClick={onClick}>Создать</Button>
        </Col>
        <Col span={12} offset={6}>
          {data?.types ? <TypeList types={data.types} /> : <h2>Список пуст</h2>}
        </Col>
        <Col span={12} offset={6} className='type__pagination'>
        {totalCount > 8 && (
          <Pagination
            current={page}
            total={totalCount}
            defaultCurrent={1}
            defaultPageSize={8}
            onChange={onChange}
          />
        )}
        </Col>
      </Row>
      <Modal
        title="Создание категории"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={submit}>
          <Form.Item name={'name'} rules={[rules.required()]}>
            <Input
              placeholder="Введите название категории"
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

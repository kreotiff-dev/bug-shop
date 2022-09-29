import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Pagination, Row } from 'antd';
import BrandList from './BrandList';
import { brandAPI } from '../../service/brand';
import { rules } from '../../utils/rules';

const AdminBrand = () => {
  const [page, setPage] = React.useState(1);
  const [form] = Form.useForm();
  const { data, isLoading } = brandAPI.useGetQuery(`?page=${page}`);
  const [create] = brandAPI.useCreateMutation();
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState<string>('');
  const totalCount = data && data.count ? data.count : 0;

  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }
  const onChange = (page: number) => {
    setPage(page);
  };
  const onClick = () => {
    setIsModal(true);
  };

  const handleOk = () => {
    form.submit();
  };
  const submit = () => {
    create(name)
      .unwrap()
      .then(() => {
        message.success('Бренд добавлен');
        setName('');
        setIsModal(false);
        form.resetFields();
      })
      .catch((e) => {
        message.error(e.data.message);
        setName('');
      });
  }
  
  const handleCancel = () => {
    setIsModal(false);
    form.resetFields();
  };
  return (
    <>
      <h1 className="h1 title">Бренд</h1>
      <Row className='brand'>
        <Col span={12} offset={6} className='brand__btn'>
          <Button onClick={onClick}>Создать</Button></Col>
        <Col span={12} offset={6}>
          {data?.brands ? (
            <BrandList brands={data.brands} />
          ) : (
            <h2>Список пуст</h2>
          )}
        </Col>
        <Col span={12} offset={6} className='brand__pagination'>
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
        title="Создание бренда"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={submit}>
          <Form.Item name='name' rules={[rules.required()]}>
            
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

export default AdminBrand;

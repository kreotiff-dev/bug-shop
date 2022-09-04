import React, { FC, useState } from 'react';
import { Form, Input, message, Modal, Popconfirm, Table } from 'antd';
import { Brand } from '@prisma/client';
import { brandAPI } from '../../service/brand';
import { rules } from '../../utils/rules';

type DataTable = {
  key: number;
  id: number;
  name: string;
};

type BrandListProps = {
  brands: Brand[];
};

const BrandList: FC<BrandListProps> = ({ brands }) => {
  const [form] = Form.useForm();
  const [isModal, setIsModal] = useState(false);
  const [remove] = brandAPI.useDeleteMutation();
  const [update] = brandAPI.useUpdateMutation();
  const [updateBrand, setUpdateBrand] = useState<{ id: number; name: string }>({
    id: 0,
    name: '',
  });
  const hundlerDelete = (id: number) => {
    remove({ id });
  };
  const hundlerUpdate = (brand: Brand) => {
    setIsModal(true);
    setUpdateBrand(brand);
  };

  const handleOk = () => {
    form.submit()
  };

  const handleCancel = () => {
    setIsModal(false);
    form.resetFields();
  };

  const submit = () => {
    update(updateBrand).unwrap().then(() => {
      form.resetFields();
      setIsModal(false);
      message.success('Бренд добавлен')
    }).catch(e=>message.error(e.data.message))
  }

  const dataTable: DataTable[] = [];
  brands.forEach((item) => {
    dataTable.push({
      key: item.id,
      id: item.id,
      name: item.name,
    });
  });
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Действие',
      key: 'action',
      render: (record: Brand) => (
        <>
          <Popconfirm
            title="Удалить?"
            onConfirm={() => hundlerDelete(record.id)}
          >
            <a>Удалить</a>
          </Popconfirm>{' '}
          /{' '}
          <Popconfirm
            title="Редактировать?"
            onConfirm={() => hundlerUpdate(record)}
          >
            <a>Редактировать</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={dataTable} pagination={false} />
      <Modal
        title="Обновление"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={submit}>
          <Form.Item name='brand' rules={[rules.required()]}>
            <Input
              placeholder="Введите новое название бренда"
              value={updateBrand.name}
              onChange={(e) =>
                setUpdateBrand({ ...updateBrand, name: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandList;

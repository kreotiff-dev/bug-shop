import React, { FC, useState } from 'react';
import { Input, Modal, Popconfirm, Table } from 'antd';
import { Brand } from '@prisma/client';
import { brandAPI } from '../../service/brand';

type DataTable = {
  key: number;
  id: number;
  name: string;
};

type BrandListProps = {
  brands: Brand[];
};

const BrandList: FC<BrandListProps> = ({ brands }) => {
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
    setIsModal(false);
    update(updateBrand);
    setUpdateBrand({ id: 0, name: '' });
  };

  const handleCancel = () => {
    setIsModal(false);
    setUpdateBrand({ id: 0, name: '' });
  };

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
        <Input
          placeholder="Введите новое название бренда"
          value={updateBrand.name}
          onChange={(e) =>
            setUpdateBrand({ ...updateBrand, name: e.target.value })
          }
        />
      </Modal>
    </>
  );
};

export default BrandList;

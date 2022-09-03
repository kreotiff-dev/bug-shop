import React, { FC, useState } from 'react';
import { Type } from '@prisma/client';
import { typeAPI } from './../../service/type';
import Popconfirm from 'antd/lib/popconfirm';
import { Input, Modal, Table } from 'antd';

type DataTable = {
  key: number;
  id: number;
  name: string;
};

type TypeListProps = {
  types: Type[];
};

const TypeList: FC<TypeListProps> = ({ types }) => {
  const [isModal, setIsModal] = useState(false);
  const [remove] = typeAPI.useDeleteMutation();
  const [update] = typeAPI.useUpdateMutation();
  const [updateType, setUpdateType] = useState<{ id: number; name: string }>({
    id: 0,
    name: '',
  });
  const hundlerDelete = (id: number) => {
    remove({ id });
  };
  const hundlerUpdate = (type: Type) => {
    setIsModal(true);
    setUpdateType(type);
  };

  const handleOk = () => {
    setIsModal(false);
    update(updateType);
  };

  const handleCancel = () => {
    setIsModal(false);
    setUpdateType({ id: 0, name: '' });
  };
  const dataTable: DataTable[] = [];
  types.forEach((item) => {
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
      render: (record: Type) => (
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
          placeholder="Введите новое название категории"
          value={updateType.name}
          onChange={(e) =>
            setUpdateType({ ...updateType, name: e.target.value })
          }
        />
      </Modal>
    </>
  );
};

export default TypeList;

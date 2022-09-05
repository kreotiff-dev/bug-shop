import React, { FC, useState } from 'react';
import { Type } from '@prisma/client';
import { typeAPI } from './../../service/type';
import Popconfirm from 'antd/lib/popconfirm';
import { Form, Input, message, Modal, Table } from 'antd';
import { rules } from '../../utils/rules';

type DataTable = {
  key: number;
  id: number;
  name: string;
};

type TypeListProps = {
  types: Type[];
};

const TypeList: FC<TypeListProps> = ({ types }) => {
  const [form] = Form.useForm();
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
    form.submit();
  };

  const handleCancel = () => {
    setIsModal(false);
    form.resetFields();
  };
  const submit = () => {
    
    update(updateType).unwrap().then(()=>{
      setIsModal(false);
      message.success('Данные обновлены')
      setIsModal(false);
      form.resetFields();
    }).catch(e => message.error(e.data.message))
  }
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
            <a onClick={() => hundlerUpdate(record)}>Редактировать</a>
        </>
      ),
    },
  ];
  return (
    <>
      <div className='type__list'>
        <Table columns={columns} dataSource={dataTable} pagination={false} />
      </div>
      <Modal
        title="Обновление"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={submit}>
          <Form.Item
            name='name'
            rules={[rules.required()]}
          >
            <Input
              placeholder="Введите новое название категории"
              value={updateType.name}
              onChange={(e) =>
                setUpdateType({ ...updateType, name: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TypeList;

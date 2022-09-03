import { Device } from '@prisma/client';
import React from 'react';
import { render } from '@testing-library/react';
import { message, Popconfirm, Table } from 'antd';
import { brandAPI } from '../../service/brand';
import { deviceAPI } from '../../service/device';
import DeviceModal from '../Modal/Device';
import DeviceItem from './DeviceItem';

type DeviceTableProps = {
  devices: Device[];
};

type DataTable = {
  key: number;
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  brand: string;
};

const DeviceTable: React.FC<DeviceTableProps> = ({ devices }) => {
  const { data, isLoading } = brandAPI.useGetQuery();
  const dataTable: DataTable[] = [];
  if (isLoading) {
    return <h3>Загрузка...</h3>;
  }
  devices.forEach((item) => {
    const brand =
      data?.brands.find((brand) => brand.id === item.brandId)?.name || '';
    dataTable.push({
      key: item.id,
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      rating: item.rating,
      brand,
    });
  });
  const columns = [
    {
      title: 'Картинка',
      key: 'img',
      render: (device: Device) => (
        <div>
          <img
            src={`http://localhost:3000/${device.img}`}
            alt="img"
            style={{ width: '40px', height: '40px' }}
          />
        </div>
      ),
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Стоимость, руб.',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Рейтинг',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Действие',
      key: 'action',
      render: (device: Device) => <DeviceItem device={device} />,
    },
  ];
  return <Table dataSource={dataTable} pagination={false} columns={columns} />;
};

export default DeviceTable;

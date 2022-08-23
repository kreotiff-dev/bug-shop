import { Button } from 'antd';
import React from 'react';
import { deviceAPI } from './../../service/device';
import DeviceList from './DeviceList';

const AdminDevice = () => {
  const { data: devices, isLoading } = deviceAPI.useGetQuery();

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <div>
      <h1 className="h1 title">Устройства</h1>
      <Button>Создать</Button>
      {devices ? <DeviceList devices={devices} /> : <h2>Список пуст</h2>}
    </div>
  );
};

export default AdminDevice;

import { Device } from '@prisma/client';
import { message, Popconfirm } from 'antd';
import React from 'react';
import { deviceAPI } from '../../service/device';
import DeviceModal from '../Modal/Device';

type DeviceItemProps = {
  device: Device;
};

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  const { data } = deviceAPI.useGetFullInfoQuery(device.id);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [remove] = deviceAPI.useDeleteMutation();
  const onDelete = () => {
    remove(device.id)
      .unwrap()
      .then(() => {
        message.success('Устройство удалено!');
      })
      .catch((error) => message.error(error.data.message));
  };
  const onUpdate = () => {
    setIsModal(true);
  };
  return (
    <>
      <Popconfirm title="Удалить?" onConfirm={onDelete}>
        <a>Удалить</a>
      </Popconfirm>{' '}
      / <a onClick={onUpdate}>Редактировать</a>
      {isModal && (
        <DeviceModal
          visible={isModal}
          setIsVisible={setIsModal}
          device={device}
          info={data?.info}
          type={data?.type}
          brand={data?.brand}
        />
      )}
    </>
  );
};

export default DeviceItem;

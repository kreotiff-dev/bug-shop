import { Device } from '@prisma/client';
import { Button, Card, List, message } from 'antd';
import React, { FC } from 'react';
import { brandAPI } from '../service/brand';
import { useNavigate, useLocation } from 'react-router-dom';
import DeviceModal from './Modal/Device';
import { deviceAPI } from './../service/device';

type DeviceItemProps = {
  device: Device;
};

const DeviceItem: FC<DeviceItemProps> = ({ device }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminPath = location.pathname.slice(0, 6) === '/admin';
  const [remove] = deviceAPI.useDeleteMutation();
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const { data: brand } = brandAPI.useGetByIdQuery(device.brandId);
  const { data: info } = deviceAPI.useGetInfoQuery(device.id);
  const pictureUrl = `/api/` + device.img;
  const onUpdate = () => {
    setIsModal(true);
  };
  const onDelete = () => {
    remove(device.id)
      .unwrap()
      .then(() => {
        message.success('Устройство удалено!');
      })
      .catch((error) => message.error(error.data.message));
  };
  const onClick = () =>
    !adminPath && navigate(`${location.pathname}/${device.id}`);
  return (
    <>
      <List.Item>
        <Card
          style={{ width: 240 }}
          cover={
            <div className="shop__item-img">
              <img alt="example" src={pictureUrl} />
            </div>
          }
          hoverable={!adminPath}
          onClick={onClick}
        >
          <h3>
            {brand?.name} {device.name}
          </h3>
          <p>Стоимость: {device.price} Р</p>
          {adminPath && (
            <>
              <Button onClick={onUpdate}>Редактировать</Button>
              <Button onClick={onDelete}>Удалить</Button>
            </>
          )}
        </Card>
      </List.Item>
      {isModal && (
        <DeviceModal
          visible={isModal}
          setIsVisible={setIsModal}
          device={device}
          info={info}
        />
      )}
    </>
  );
};

export default DeviceItem;

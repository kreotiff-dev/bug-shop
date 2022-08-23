import { Device } from '@prisma/client';
import { Card, List } from 'antd';
import React, { FC } from 'react';
import { brandAPI } from './../../service/brand';
import { useNavigate } from 'react-router-dom';

type DeviceItemProps = {
  device: Device;
};

const DeviceItem: FC<DeviceItemProps> = ({ device }) => {
  const navigate = useNavigate();
  const { data: brand } = brandAPI.useGetByIdQuery(device.brandId);
  const onClick = () => navigate(`/admin/device/${device.id}`);
  return (
    <List.Item>
      <Card
        onClick={onClick}
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <h3>
          {brand?.name} {device.name}
        </h3>
      </Card>
    </List.Item>
  );
};

export default DeviceItem;

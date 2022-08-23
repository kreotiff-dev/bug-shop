import { Device } from '@prisma/client';
import { Card, List } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { FC } from 'react';
import DeviceItem from './DeviceItem';

type DeviceListProps = {
  devices: Device[];
};

const DeviceList: FC<DeviceListProps> = ({ devices }) => {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={devices}
      renderItem={(item) => <DeviceItem device={item} />}
    />
  );
};

export default DeviceList;

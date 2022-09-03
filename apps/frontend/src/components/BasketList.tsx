import { BasketDevice, Device } from '@prisma/client';
import React from 'react';
import { List } from 'antd';
import BasketItem from './BasketItem';

type BasketListProps = {
  devices: BasketDevice[];
};

const BasketList: React.FC<BasketListProps> = ({ devices }) => {
  return (
    <List className="basket__list">
      {devices.map((item) => {
        return (
          <BasketItem
            key={item.id}
            count={item.count}
            idDevice={item.deviceId}
          />
        );
      })}
    </List>
  );
};

export default BasketList;

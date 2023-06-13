import React from 'react';
import { Link } from 'react-router-dom';
import { deviceAPI } from '../service/device';
import { basketAPI } from './../service/basket';
import { Button, message } from 'antd';
import CountDeviceBasket from './CountDeviceBasket';

type BasketItemProps = {
  count: number;
  idDevice: number;
  setPrice?: React.Dispatch<React.SetStateAction<number>>;
  price?: number;
};

const BasketItem: React.FC<BasketItemProps> = ({
  count: oldCount,
  idDevice,
}) => {
  const { data } = deviceAPI.useGetFullInfoQuery(idDevice);
  const [removeDevice] = basketAPI.useDeleteDeviceMutation();
  const [updateDevice, { isLoading }] = basketAPI.useUpdateDeviceMutation();
  const [count, setCount] = React.useState<number>(oldCount);
  const onDelete = () => {
    removeDevice({ idDevice })
      .unwrap()
      .then(() => {
        message.success('Устройство удалено из корзины');
      })
      .catch((e) => message.error(e.data.message));
  };
  const updateCount = (e: React.ChangeEvent<HTMLInputElement> | number) => {
    if (typeof e === 'number') {
      updateDevice({ count: e, idDevice });
      setCount(e);
    } else {
      updateDevice({ count: parseInt(e.target.value), idDevice });
      setCount(parseInt(e.target.value));
    }
  };
  return (
    <div className="basket__item">
      <div className="basket__item-img" style={{ height: '100px' }}>
        <img src={`${window.location.protocol}//${window.location.hostname}:3000/${data?.device?.img}`} alt="img" />
      </div>
      <Link to={`/shop/${data?.device?.id}`} className="basket__item-title">
        {data?.brand.name} {data?.device?.name}
      </Link>
      <div className="basket__item-action">
        <CountDeviceBasket
          callback={updateCount}
          value={count}
          disabled={isLoading}
        />
        <Button onClick={onDelete} className="basket__item-delete">
          Удалить
        </Button>
      </div>
      {data?.device && (
        <h3 className="basket__item-price">{count * data?.device?.price} ₽</h3>
      )}
    </div>
  );
};

export default BasketItem;

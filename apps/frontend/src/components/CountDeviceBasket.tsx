import React, { FC } from 'react';

type CountDeviceBasketProps = {
  callback: (e: React.ChangeEvent<HTMLInputElement> | number) => void;
  value: number;
  disabled: boolean;
};

const CountDeviceBasket: FC<CountDeviceBasketProps> = ({
  callback,
  value,
  disabled,
}) => {
  const addCount = () => callback(value + 1);
  const minusCount = () => callback(value - 1);
  return (
    <div className="count">
      <button
        disabled={disabled || value === 1}
        onClick={minusCount}
        className="count__minus"
      >
        -
      </button>
      <div className="count__input-block">
        <span className="count__input">{value}</span>
      </div>
      {/* <input
        type="number"
        value={value}
        className="count__input"
        onChange={callback}
        disabled={true}
        min={1}
        minLength={1}
      /> */}
      <button
        disabled={disabled || value === 99}
        onClick={addCount}
        className="count__plus"
      >
        +
      </button>
    </div>
  );
};

export default CountDeviceBasket;

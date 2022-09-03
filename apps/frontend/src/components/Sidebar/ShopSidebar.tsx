import React from 'react';
import { Button, Select } from 'antd';
import { brandAPI } from './../../service/brand';
import { typeAPI } from './../../service/type';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseSearch } from '../../utils/parseData';
import { formatSearch } from './../../utils/formatData';

type ShopSidebarPops = {
  setFilter: React.Dispatch<
    React.SetStateAction<{
      brandId: string | null;
      typeId: string | null;
      page: string;
    }>
  >;
  filter: {
    brandId: string | null;
    typeId: string | null;
    page: string;
  };
};

const ShopSidebar: React.FC<ShopSidebarPops> = ({ filter, setFilter }) => {
  const navigate = useNavigate();
  const { data: brandData } = brandAPI.useGetQuery();
  const { data: typeData } = typeAPI.useGetQuery();
  const resetFilter = () => {
    setFilter({ brandId: null, typeId: null, page: '1' });
    navigate('/shop');
  };
  const onChangeBrand = (e: string) => {
    setFilter({ ...filter, brandId: e, page: '1' });
    navigate({
      search: formatSearch({ ...filter, brandId: e, page: '1' }),
    });
  };
  const onChangeType = (e: string) => {
    setFilter({ ...filter, typeId: e, page: '1' });
    navigate({
      search: formatSearch({ ...filter, typeId: e, page: '1' }),
    });
  };

  return (
    <div className="shop__sidebar container">
      <h2 className="shop__sidebar-title">Фильтры:</h2>
      <Select
        placeholder="Бренд"
        onChange={onChangeBrand}
        value={filter.brandId}
        className="shop__sidebar-filter"
      >
        {brandData?.brands?.map((item) => {
          return (
            <Select.Option value={item.id} key={item.id} children={item.name} />
          );
        })}
      </Select>
      <Select
        placeholder="Категория"
        onChange={onChangeType}
        value={filter.typeId}
        className="shop__sidebar-filter"
      >
        {typeData?.types?.map((item) => {
          return (
            <Select.Option value={item.id} key={item.id} children={item.name} />
          );
        })}
      </Select>
      <Button onClick={resetFilter}>Сбросить</Button>
    </div>
  );
};

export default ShopSidebar;

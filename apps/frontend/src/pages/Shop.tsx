import { Button, Pagination } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeviceList from '../components/DeviceList';
import Layout from '../components/Layout';
import { deviceAPI } from './../service/device';
import ShopSidebar from './../components/Sidebar/ShopSidebar';
import { parseSearch } from '../utils/parseData';
import { formatSearch } from './../utils/formatData';

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<{
    brandId: string | null;
    typeId: string | null;
    page: string;
  }>({
    brandId: parseSearch(location.search).brandId,
    typeId: parseSearch(location.search).typeId,
    page: '1',
  });
  const search = location.search;
  const { data } = deviceAPI.useGetQuery(search);
  const totalCount = data && data.count ? data.count : 0;

  const onChange = (page: number) => {
    setFilter({ ...filter, page: page.toString() });
    navigate({
      search: formatSearch({ ...filter, page: page.toString() }),
    });
  };

  return (
    <Layout>
      <ShopSidebar filter={filter} setFilter={setFilter} />
      <div className="container shop__body">
        {data?.devices ? (
          <DeviceList devices={data.devices} />
        ) : (
          <h1>Ошибка..</h1>
        )}
        {totalCount > 8 && (
          <Pagination
            className="shop__list-pagination"
            current={parseInt(filter.page)}
            onChange={onChange}
            total={totalCount}
            defaultPageSize={8}
            defaultCurrent={1}
          />
        )}
      </div>
    </Layout>
  );
};

export default Shop;

import { Button, Pagination } from 'antd';
import React from 'react';
import DeviceList from '../DeviceList';
import CreateDevice from '../Modal/Device';
import { deviceAPI } from './../../service/device';
import DeviceTable from './DeviceTable';

const AdminDevice = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = deviceAPI.useGetQuery(`?page=${page}`);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const totalCount = data && data.count ? data.count : 0;
  const onChange = (page: number) => {
    setPage(page);
  };
  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  const onClick = () => setIsModal(true);

  return (
    <div>
      <h1 className="h1 title">Устройства</h1>
      <div className="container admin__device">
        <Button onClick={onClick} className="admin__device-btn">
          Создать
        </Button>
        {data?.devices ? (
          <div className="admin__device-table">
            <DeviceTable devices={data?.devices} />
          </div>
        ) : (
          // <DeviceList devices={data.devices} />
          <h2>Список пуст</h2>
        )}
        {totalCount > 8 && (
          <Pagination
            current={page}
            total={data?.count}
            defaultCurrent={1}
            onChange={onChange}
            className="admin__device-pagination"
          />
        )}
        {isModal && (
          <CreateDevice visible={isModal} setIsVisible={setIsModal} />
        )}
      </div>
    </div>
  );
};

export default AdminDevice;

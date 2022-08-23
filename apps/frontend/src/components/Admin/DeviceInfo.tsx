import React from 'react';
import { useParams } from 'react-router-dom';
import { deviceAPI } from './../../service/device';

const DeviceInfo = () => {
  const params = useParams();
  const id = params['id'] || '';
  const { data: info } = deviceAPI.useGetFullInfoQuery(parseInt(id));

  return (
    <div>
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>название</p>
          <p>Цена</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;

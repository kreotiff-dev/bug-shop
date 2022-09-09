import { Device, Brand, Type } from '@prisma/client';
import {
  CreateDeviceDto,
  deviceInfo,
  UpdateDeviceDto,
  UpdateInfoDeviceDto,
} from '@store/interface';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React from 'react';
import { brandAPI } from '../../service/brand';
import { deviceAPI } from '../../service/device';
import { typeAPI } from '../../service/type';
import { rules } from '../../utils/rules';

interface info extends deviceInfo {
  number: number;
}

interface infoUpdate extends UpdateInfoDeviceDto {
  number: number;
}

type CreateDeviceProps = {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  device?: Device;
  info?: UpdateInfoDeviceDto[];
  brand?: Brand;
  type?: Type;
};

const DeviceModal: React.FC<CreateDeviceProps> = ({
  visible,
  setIsVisible,
  device: oldDevice,
  info: oldInfo,
  brand,
  type,
}) => {
  const [form] = Form.useForm();
  const { data: types, isLoading: isLoadingT } = typeAPI.useGetQuery();
  const { data: brands, isLoading: isLoadingB } = brandAPI.useGetQuery();
  const [create] = deviceAPI.useCreateMutation();
  const [update] = deviceAPI.useUpdateMutation();
  const [picture, setPicture] = React.useState<File | null>(null);
  const [info, setInfo] = React.useState<info[] | infoUpdate[]>([]);

  const [device, setDevice] = React.useState<CreateDeviceDto | UpdateDeviceDto>(
    {
      brandId: brand ? brand.id.toString() : '',
      typeId: type ? type.id.toString() : '',
      name: oldDevice ? oldDevice.name : '',
      price: oldDevice ? oldDevice.price.toString() : '',
    }
  );

  React.useEffect(() => {
    if (oldInfo) {
      const newInfo: infoUpdate[] = [];
      oldInfo.forEach((item) => {
        newInfo.push({
          id: item.id,
          title: item.title,
          description: item.description,
          number: item.id,
        });
      });
      setInfo(newInfo);
    }
  }, [visible]);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number: number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  const handleOk = () => {
    form.submit();
  };
  const submit =  async () => {
    const data = new FormData();
    data.append('file', picture as any);
    data.append('info', JSON.stringify(info));
    data.append('name', device.name);
    data.append('price', device.price);
    if (
      brands?.brands.find((item) => item.id.toString() === device.brandId)?.id
    ) {
      data.append(
        'brandId',
        brands?.brands
          .find((item) => item.id.toString() === device.brandId)
          ?.id.toString() || ''
      );
    } else {
      data.append(
        'brandId',
        brands?.brands
          .find((item) => item.name.toString() === device.brandId)
          ?.id.toString() || ''
      );
    }
    if (types?.types.find((item) => item.id.toString() === device.typeId)?.id) {
      data.append(
        'typeId',
        types?.types
          .find((item) => item.id.toString() === device.typeId)
          ?.id.toString() || ''
      );
    } else {
      data.append(
        'typeId',
        types?.types
          .find((item) => item.name.toString() === device.typeId)
          ?.id.toString() || ''
      );
    }
    if (oldDevice) {
      await update({ data, id: oldDevice.id })
        .unwrap()
        .then(() => {
          message.success('Данные обновленны!');
          reset();
        })
        .catch((error) => message.error(error.data.message));
    } else {
      await create(data)
        .unwrap()
        .then(() => {
          message.success('Устройство добавлено!');
          reset();
        })
        .catch((error) => message.error(error.data.message));
    }
  }
  const reset = () => {
    form.resetFields();
    setIsVisible(false);
    setInfo([]);
  };

  if (isLoadingB || isLoadingT) {
    return null;
  }
  return (
    <Modal visible={visible} onOk={handleOk} onCancel={reset}>
      <Form form={form} onFinish={submit}>
        <Form.Item
          name="type"
          initialValue={
            types?.types.find((item) => item.id === parseInt(device?.typeId))
              ?.name
          }
          rules={[rules.required()]}
        >
          <Select
            placeholder="Выберите категорию"
            onChange={(e) => setDevice({ ...device, typeId: e })}
          >
            {types?.types.map((item) => {
              return (
                <Select.Option value={item.name} key={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="brand"
          initialValue={
            brands?.brands.find((item) => item.id === parseInt(device?.brandId))
              ?.name
          } 
          rules={[rules.required()]}
        >
          <Select
            placeholder="Выберите бренд"
            onChange={(e) => setDevice({ ...device, brandId: e })}
          >
            {brands?.brands.map((item) => {
              return (
                <Select.Option value={item.name} key={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="name" initialValue={oldDevice?.name} rules={[rules.required()]}>
          <Input
            placeholder="Введите название устройства"
            value={device.name}
            onChange={(e) => setDevice({ ...device, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item name="price" initialValue={oldDevice?.price.toString()} rules={[rules.required()]}>
          <Input
            placeholder="Введите стоимость"
            type={'number'}
            value={device.price}
            onChange={(e) => setDevice({ ...device, price: e.target.value })}
          />
        </Form.Item>
        <Form.Item name="img">
          <Input
            placeholder="Загрузить фото"
            type={'file'}
            onChange={(e) =>
              setPicture(e.target.files ? e.target.files[0] : null)
            }
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={addInfo}>Добавить новое свойство</Button>
        </Form.Item>
        {info?.map((item) => {
          return (
            <Row key={item.number}>
              <Col span={8} >
                <Form.Item name={`title-${item.number}`} rules={[rules.required()]} initialValue={item.title}>
                  <Input
                    value={item.title}
                    onChange={(e) =>
                      changeInfo('title', e.target.value, item.number)
                    }
                    placeholder="Введите название свойства"
                  />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
              <Form.Item name={`desc-${item.number}`} rules={[rules.required()]} initialValue={item.description}>
                <Input
                  value={item.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, item.number)
                  }
                  placeholder="Введите описание свойства"
                />
              </Form.Item>
              </Col>
              <Col span={5} offset={2}>
              <Button style={{width:'100%'}} onClick={() => removeInfo(item.number)}>Удалить</Button>
              </Col>
            </Row>
          );
        })}
      </Form>
    </Modal>
  );
};

export default DeviceModal;

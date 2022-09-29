import { Sex, User } from '@prisma/client';
import { Form, Input, Modal, Radio, message } from 'antd';
import React from 'react';
import { rules } from './../../utils/rules';
import { parseStringToDate } from '../../utils/parseData';
import { userAPI } from './../../service/user';
import { formatDateForInput } from '../../utils/formatData';

type UpdateUserProps = {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

const UpdateUser: React.FC<UpdateUserProps> = ({
  setIsVisible,
  visible,
  user: oldUser,
}) => {
  const [form] = Form.useForm();
  const [user, setUser] = React.useState<User>(oldUser);
  const [update] = userAPI.useUpdateMutation();

  const handleOk = () => {
    form.submit();
  };
  const submit = () => {
    let bithday;
    if (!user.bithday) {
      bithday = undefined;
    } else if (user.bithday === oldUser.bithday) {
      bithday = user.bithday;
    } else {
      bithday = user.bithday / 1000;
    }
    update({
      bithday: bithday,
      email: user.email,
      name: user.name || '',
      phone: user.phone || '',
      sex: user.sex || undefined,
      surname: user.surname || '',
    })
      .unwrap()
      .then(() => {
        message.success('Данные обновленны!');
      })
      .catch((e) => message.error(e.data.message));
    setIsVisible(false);
  };
  const handleCancel = () => {
    setIsVisible(false);
  };
  const options = [
    { label: 'М', value: Sex.MALE },
    { label: 'Ж', value: Sex.FEMALE },
  ];
  return (
    <Modal
      title="Изменение данных"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={submit}>
        <Form.Item
          name={'surname'}
          rules={[rules.required()]}
          initialValue={user.surname}
        >
          <Input
            placeholder="Фамилия"
            onChange={(e) => setUser({ ...user, surname: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name={'name'}
          rules={[rules.required()]}
          initialValue={user.name}
        >
          <Input
            placeholder="Имя"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name={'email'}
          rules={[rules.required()]}
          initialValue={user.email}
        >
          <Input
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name={'phone'}
          rules={[rules.required()]}
          initialValue={user.phone}
        >
          <Input
            placeholder="Телефон"
            type={'number'}
            value={user.phone ? user.phone : ''}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name={'sex'}
          rules={[rules.required()]}
          initialValue={user.sex}
        >
          <Radio.Group
            options={options}
            value={user.sex ? user.sex : ''}
            onChange={(e) => setUser({ ...user, sex: e.target.value })}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item
          name={'birthday'}
          rules={[rules.required()]}
          initialValue={formatDateForInput(user?.bithday || null)}
        >
          <Input
            placeholder="Дата рождения"
            type={'date'}
            value={user.bithday ? user.bithday : ''}
            onChange={(e) => {
              setUser({ ...user, bithday: parseStringToDate(e.target.value) });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUser;

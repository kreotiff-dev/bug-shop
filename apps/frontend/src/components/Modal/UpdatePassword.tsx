import { Form, Input, Modal, message, Divider } from 'antd';
import React from 'react';
import { rules } from '../../utils/rules';
import { userAPI } from './../../service/user';

type UpdatePasswordProps = {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdatePassword: React.FC<UpdatePasswordProps> = ({
  visible,
  setIsVisible,
}) => {
  const [update] = userAPI.useUpdatePasswordMutation();
  const [password, setPassword] = React.useState<{
    old: string;
    new: string;
    confirm: string;
  }>({
    confirm: '',
    new: '',
    old: '',
  });
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };
  const submit = () => {
    if (password.new !== password.confirm) {
      message.warn('Пароли не совпадают');
    } else {
      update({ newPassword: password.new, oldPassword: password.old })
        .unwrap()
        .then(() => {
          message.success('Пароль изменен');
          setIsVisible(false);
          form.resetFields();
        })
        .catch((e) => message.error(e.data.message));
    }
  };
  const handleCancel = () => {
    setIsVisible(false);
  };
  return (
    <Modal
      title="Обновить пароль"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={submit} layout="vertical">
        <Form.Item rules={[rules.required()]} name="old" label="Старый пароль">
          <Input.Password
            name={'old'}
            placeholder="Введите старый пароль"
            value={password.old}
            onChange={(e) => setPassword({ ...password, old: e.target.value })}
          />
        </Form.Item>
        <Form.Item rules={[rules.required()]} name="new" label="Новый пароль">
          <Input.Password
            placeholder="Введите новый пароль"
            value={password.new}
            onChange={(e) => setPassword({ ...password, new: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          rules={[rules.required()]}
          name="confirm"
          label="Подтвердить пароль"
        >
          <Input.Password
            placeholder="Подтвердите новый пароль"
            value={password.confirm}
            onChange={(e) =>
              setPassword({ ...password, confirm: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePassword;

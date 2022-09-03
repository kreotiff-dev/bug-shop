import { Form, Input, Modal, message } from 'antd';
import React from 'react';
import { rules } from '../../utils/rules';
import { userAPI } from './../../service/user';

type DeleteUserProps = {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ visible, setIsVisible }) => {
  const [form] = Form.useForm();
  const [deleteMe] = userAPI.useDeleteMutation();
  const [password, setPassword] = React.useState<string>('');
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsVisible(false);
    form.resetFields();
  };
  const submit = () => {
    deleteMe({ password })
      .unwrap()
      .then(() => {
        message.success('Аккаунт удален');
        setIsVisible(false);
      })
      .catch((e) => message.error(e.data.message));
  };
  return (
    <Modal
      title="Удалить аккаунт"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h2>Введите пароль для подтверждения</h2>
      <Form form={form} onFinish={submit}>
        <Form.Item name="password" rules={[rules.required()]}>
          <Input.Password
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeleteUser;

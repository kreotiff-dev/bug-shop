import * as React from 'react';
import { Button, Form, Input, message } from 'antd';
import { authAPI } from '../service/auth';
import { AuthDto } from '@store/interface';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';

export function LoginForm() {
  const [login, { isLoading }] = authAPI.useLoginMutation();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [reg, { isLoading: isRegLoading }] = authAPI.useRegistrationMutation();
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState<AuthDto>({
    email: '',
    password: '',
  });
  const onFinish = async () => {
    if (isLogin) {
      await login(auth)
        .unwrap()
        .then(() => {
          navigate(SHOP_ROUTE);
          // message.success('Вход выполнен успешно');
        })
        .catch((e: any) => message.error(e.data.message));
    } else {
      await reg(auth)
        .unwrap()
        .then(() => {
          navigate(SHOP_ROUTE);
        })
        .catch((e: any) => message.error(e.data.message));
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Почта"
        name="email"
        rules={[{ required: true, message: 'Введите email' }]}
      >
        <Input
          placeholder="Email.."
          value={auth.email}
          onChange={(e) => setAuth({ ...auth, email: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password
          placeholder="Пароль.."
          value={auth.password}
          onChange={(e) => setAuth({ ...auth, password: e.target.value })}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading || isRegLoading}
        >
          {isLogin ? 'Войти' : 'Регистрация'}
        </Button>
      </Form.Item>
    </Form>
  );
}

import { useState, type FC } from 'react';
import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useHideMenu } from '../../hooks/useHideMenu';
import { getUserStorage } from '../../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [user] = useState(getUserStorage());
  
  useHideMenu(false);
  const onFinish = ({ agent, desktop }: any) => {
    localStorage.setItem('agent', agent);
    localStorage.setItem('desktop', desktop);
    navigate('/escritorio', {
      replace: true,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (user.agent && user.desktop) {
    return <Navigate to="/escritorio" />
  }
  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y número de escritorio</Text>
      <Divider />
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Nombre del agente'
          name='agent'
          rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Escritorio'
          name='desktop'
          rules={[
            { required: true, message: 'Ingrese el número de escritorio' },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
          <Button type='primary' shape='round' htmlType='submit'>
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

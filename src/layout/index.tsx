import { useContext, type FC } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import { UIContext } from '../contexts';

const { Sider, Content } = Layout;

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const LayoutQueue: FC<Props> = ({ children }) => {
  const {isSideMenuHide} = useContext(UIContext)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider collapsedWidth={0} breakpoint='md' hidden={isSideMenuHide} >
        <div className='logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item key='1' icon={<UserOutlined />}>
            <Link to='/ingresar'>Ingresar</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<VideoCameraOutlined />}>
            <Link to='/cola'>Cola de tickets</Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<UploadOutlined />}>
            <Link to='/crear'>Crear ticket</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '24px' }} className='site-layout'>
        <Content
          style={{
            margin: '0px 0px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

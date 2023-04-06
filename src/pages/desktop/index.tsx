import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Button, Divider } from 'antd';
import { useHideMenu } from '../../hooks/useHideMenu';
import { useContext, useState } from 'react';
import { getUserStorage } from '../../helpers/getUsuarioStorage';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from '../../contexts';
import { type Ticket } from '../../models/ticket';

const { Title, Text } = Typography;

export const DesktopPage = () => {
  const navigate = useNavigate();
  useHideMenu(false);
  const [user] = useState(getUserStorage());
  const [newTicketAssigned, setNewTicketAssigned] = useState<Ticket>()
  const { socket } = useContext(SocketContext);
  const onLogout = () => {
    localStorage.clear();
    navigate('/ingresar', { replace: true });
  };
  const nextTicket = () => {
    socket.emit('assign-ticket', user, (ticketAssigned: Ticket) => {
      setNewTicketAssigned(ticketAssigned);
    });
  };

  if (!user.agent || !user.desktop) {
    return <Navigate to='/ingresar' />;
  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agent}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type='success'>{user.desktop}</Text>
        </Col>
        <Col span={4}>
          <Button shape='round' danger type='dashed' onClick={onLogout}>
            Salir
            <CloseCircleOutlined />
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          <Text>Está atendiendo el ticket número:</Text>
          <Text style={{ fontSize: 30 }} type='danger'>
            {newTicketAssigned?.number}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col offset={18} span={6} style={{ textAlign: 'center' }}>
          <Button type='primary' shape='round' onClick={nextTicket}>
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};

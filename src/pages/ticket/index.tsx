import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useHideMenu } from '../../hooks/useHideMenu';
import { useContext, useState } from 'react';
import { SocketContext } from '../../contexts';
import { type Ticket } from '../../models/ticket';

const { Title, Text } = Typography;
const TicketPage = () => {
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState<Ticket>();
  useHideMenu(true);
  
  const newTicket = () => {
    socket.emit('request-ticket', null, (newTicket: Ticket) => {
      setTicket(newTicket);
    });
  };
  return (
    <>
      <Row>
        <Col span={14} offset={6} style={{ textAlign: 'center' }}>
          <Title level={3}>Presione el botón para un nuevo ticket</Title>
          <Button
            type='primary'
            shape='round'
            icon={<DownloadOutlined />}
            size='large'
            onClick={newTicket}
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>
      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} style={{ textAlign: 'center' }}>
            <Text style={{ fontSize: 30 }}>Su número </Text>
            <br />
            <Text style={{ fontSize: 55 }} type='success'>
              {ticket?.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TicketPage;

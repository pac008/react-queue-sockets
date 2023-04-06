import { useContext, useEffect, useState } from 'react';
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import { useHideMenu } from '../../hooks/useHideMenu';
import { SocketContext } from '../../contexts';
import { type Ticket } from '../../models/ticket';
import { getLastThirteen } from '../../helpers/getLastThirteen';

const { Title, Text } = Typography;

export const QueuePage = () => {
  useHideMenu(true);
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    socket.on('ticket-assigned', lastThirteen => {
      setTickets(lastThirteen);
    });

    return () => {
      socket.off('ticket-assigned');
    };
  }, [socket]);

  useEffect(() => {
    getLastThirteen()
      .then(resp => setTickets(resp.lastThirteen))
      .catch(() => setTickets([]));
  }, []);

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={item => (
              <List.Item key={item.number}>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag key={item.number} color='volcano'>
                      {item.agent}
                    </Tag>,
                    <Tag key={item.number} color='magenta'>
                      Escritorio: {item.desktop}
                    </Tag>,
                  ]}
                >
                  <Title>No. {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider> Historial </Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={item => (
              <List.Item key={item.number}>
                <List.Item.Meta
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type='secondary'>En el desktop</Text>
                      <Tag color='magenta'>{item.desktop}</Tag>
                      <Text type='secondary'>Agente: </Text>
                      <Tag color='volcano'>{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

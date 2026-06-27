"use client";
import React from 'react';
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Statistic,
  List,
  Avatar,
  Tabs,
  Divider,
} from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  BellOutlined,
} from '@ant-design/icons';
import GetUserInfo from '@/service/profile.service';
import useUser from '@/hooks/useUser';

const { Title, Text } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const UserDashboard: React.FC = () => {
  // Mock data for demonstration
  const user = useUser();
  console.log('userName', user);
  
  const stats = [
    {
      title: 'Total Logins',
      value: 120,
      icon: <UserOutlined />,
    },
    {
      title: 'Total Bids',
      value: 69,
      icon: <CheckCircleOutlined />,
    },
    {
      title: 'Total Wins',
      value: 75,
      icon: <CheckCircleOutlined />,
    },
    {
      title: 'Messages',
      value: 15,
      icon: <MessageOutlined />,
    },
    {
      title: 'Notifications',
      value: 105,
      icon: <BellOutlined />,
    },
  ];

  const recentActivities = [
    {
      title: 'Logged in',
      description: 'You logged into your account.',
      time: '2 hours ago',
    },
    {
      title: 'Placed a Bid',
      description: 'You placed a bid on "Vintage Clock".',
      time: '1 day ago',
    },
    {
      title: 'Won an Auction',
      description: 'You won the auction for "Antique Vase".',
      time: '3 days ago',
    },
  ];

  const messages = [
    {
      sender: 'Admin',
      content: 'Your account has been verified.',
      time: '2 hours ago',
    },
    {
      sender: 'Support',
      content: 'Your ticket #1234 has been resolved.',
      time: '1 day ago',
    },
    {
      sender: 'Jane Smith',
      content: 'Thank you for your purchase!',
      time: '3 days ago',
    },
  ];

  const notifications = [
    {
      content: 'New auction "Vintage Car" is live now.',
      time: '1 hour ago',
    },
    {
      content: 'Your bid on "Classic Painting" was outbid.',
      time: '5 hours ago',
    },
    {
      content: 'Auction "Antique Watch" ends in 2 hours.',
      time: '1 day ago',
    },
  ];

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <Title level={2}>Welcome back, {user?.currentUser?.name}!</Title>
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={8} lg={4} key={index}>
              <Card>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.icon}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Divider />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Recent Activities" key="1">
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<ClockCircleOutlined />}
                        style={{ backgroundColor: '#1890ff' }}
                      />
                    }
                    title={item.title}
                    description={
                      <>
                        <Text>{item.description}</Text>
                        <br />
                        <Text type="secondary">{item.time}</Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Messages" key="2">
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<MessageOutlined />}
                        style={{ backgroundColor: '#52c41a' }}
                      />
                    }
                    title={item.sender}
                    description={
                      <>
                        <Text>{item.content}</Text>
                        <br />
                        <Text type="secondary">{item.time}</Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Notifications" key="3">
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<BellOutlined />}
                        style={{ backgroundColor: '#faad14' }}
                      />
                    }
                    title={item.content}
                    description={<Text type="secondary">{item.time}</Text>}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default UserDashboard;

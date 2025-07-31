'use client';
import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const {Title} = Typography;

const chartData = [
  { name: 'Jan', views: 4000, profit: 2400, products: 2400, users: 1800 },
  { name: 'Feb', views: 3000, profit: 1398, products: 2210, users: 2800 },
  { name: 'Mar', views: 2000, profit: 9800, products: 2290, users: 2000 },
  { name: 'Apr', views: 2780, profit: 3908, products: 2000, users: 2500 },
  { name: 'May', views: 1890, profit: 4800, products: 2181, users: 2100 },
  { name: 'Jun', views: 2390, profit: 3800, products: 2500, users: 2400 },
  { name: 'Jul', views: 3490, profit: 4300, products: 2100, users: 3200 },
];

const DashboardStats: React.FC = () => {
  return (
    <div>
      <Title level={4}>Bảng thống kê</Title>
      <Row gutter={[16, 16]}>
        {/* Total Views */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số tài liệu hình"
              value={3.456}
              precision={3}
              valueStyle={{color: '#3f8600'}}
              prefix="$"
              suffix="K"
            />
            <div style={{marginTop: '8px', fontSize: '14px', color: '#3f8600'}}>
              <ArrowUpOutlined/> 0.43%
            </div>
          </Card>
        </Col>

        {/* Total Profit */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số tài liệu nhập"
              value={45.2}
              precision={1}
              valueStyle={{color: '#3f8600'}}
              prefix="$"
              suffix="K"
            />
            <div style={{marginTop: '8px', fontSize: '14px', color: '#3f8600'}}>
              <ArrowUpOutlined/> 4.35%
            </div>
          </Card>
        </Col>

        {/* Total Product */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số tài liệu file"
              value={2450}
              valueStyle={{color: '#3f8600'}}
            />
            <div style={{marginTop: '8px', fontSize: '14px', color: '#3f8600'}}>
              <ArrowUpOutlined/> 2.59%
            </div>
          </Card>
        </Col>

        {/* Total Users */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số tài liệu âm thanh"
              value={3456}
              valueStyle={{color: '#cf1322'}}
            />
            <div style={{marginTop: '8px', fontSize: '14px', color: '#cf1322'}}>
              <ArrowDownOutlined/> 0.96%
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{marginTop: 20}}>
        {/* Total Views */}
        <Col xs={24} sm={12} md={12}>
          <Card>
            <Statistic
              title="Tổng số câu hỏi"
              value={3.456}
              precision={3}
              valueStyle={{color: '#3f8600'}}
              prefix="$"
              suffix="K"
            />
            <div style={{marginTop: '8px', fontSize: '14px', color: '#3f8600'}}>
              <ArrowUpOutlined/> 0.43%
            </div>
          </Card>
        </Col>

        {/* Total Profit */}
        <Col xs={24} sm={12} md={12}>
          <Card>
            <Statistic
              title="Tổng số tài khoản"
              value={45.2}
              precision={1}
              valueStyle={{color: '#3f8600'}}
              prefix="$"
              suffix="K"
            />
            <div style={{marginTop: '8px', fontSize: '14px', color: '#3f8600'}}>
              <ArrowUpOutlined/> 4.35%
            </div>
          </Card>
        </Col>


      </Row>
      <Row gutter={[16, 16]} style={{marginTop: 20}}>
        <Col span={24}>
          <Card title="Performance Overview">
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="profit" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="products" stackId="3" stroke="#ffc658" fill="#ffc658" />
                  <Area type="monotone" dataKey="users" stackId="4" stroke="#ff8042" fill="#ff8042" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStats;
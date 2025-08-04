import React from 'react';
import { Layout, Space, Typography } from 'antd';
import { FacebookFilled, FacebookOutlined, GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import { FacebookMeta } from 'next/dist/lib/metadata/generate/basic';

const {Footer} = Layout;
const {Link, Text} = Typography;

const CustomFooter: React.FC = () => {
  return (
    <Footer style={{
      textAlign: 'center', padding: '16px 24px',
      background: '#f0f2f5',
      marginTop: '64px',
    }}>
      <Space direction="vertical" size="middle">
        <Space>
          <Link href="https://github.com/thienha20" target="_blank">
            <GithubOutlined/>
          </Link>
          <Link href="https://facebook.com/dungtrac" target="_blank">
            <FacebookFilled/>
          </Link>
        </Space>
        <Text type="secondary">
          © {new Date().getFullYear()} Chat bot AI. All rights reserved.
        </Text>
      </Space>
    </Footer>
  );
};

export default CustomFooter;
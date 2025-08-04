import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FullPageLoader: React.FC = () => {

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #f0f2f5, #e6f7ff)',
        zIndex: 9999,
      }}
    >
      {/* ✅ Nest một div bên trong Spin để dùng tip đúng cách */}
      <Spin
        spinning={true}
        fullscreen
        tip={<span style={{ whiteSpace: 'nowrap' }}>Đang tải dữ liệu...</span>}
        size="large"
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      >
        {/* ✅ Nội dung con có chiều cao để tip không bị đè */}
        <div style={{ width: 120, height: 100 }} />
      </Spin>
    </div>
  );
};

export default FullPageLoader;

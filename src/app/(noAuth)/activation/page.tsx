'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Result, Button, Spin } from 'antd';
import Link from 'next/link';

export default function AccountActivationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  // Giả lập kiểm tra token
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        // Gọi API xác minh token ở đây (giả lập delay 1.5s)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Giả lập điều kiện token hợp lệ
        if (token === 'abc123' || token.length > 5) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    validateToken();
  }, [token]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f0f2f5, #e6f7ff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Card
        style={{
          maxWidth: 480,
          width: '100%',
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        {status === 'loading' && <Spin size="large" />}

        {status === 'success' && (
          <Result
            status="success"
            title="Tài khoản của bạn đã được kích hoạt!"
            subTitle="Bạn có thể đăng nhập ngay bây giờ."
            extra={[
              <Link href="/login" key="login">
                <Button type="primary">Đăng nhập</Button>
              </Link>,
            ]}
          />
        )}

        {status === 'error' && (
          <Result
            status="error"
            title="Liên kết không hợp lệ"
            subTitle="Token kích hoạt không hợp lệ hoặc đã hết hạn."
            extra={[
              <Link href="/" key="home">
                <Button>Về trang chủ</Button>
              </Link>,
            ]}
          />
        )}
      </Card>
    </div>
  );
}

'use client';
import { useEffect } from 'react';
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function Error({error, reset}: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div
      style={{
        height: '100vh',
        background: 'linear-gradient(to right, #f0f2f5, #e6f7ff)',
      }}
    >
      <Result
        status="500"
        title="500"
        subTitle="Đã có lỗi xảy ra. Vui lòng thử lại sau."
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
}

'use client';
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        height: '100vh',
        background: 'linear-gradient(to right, #f0f2f5, #e6f7ff)',
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn tìm không tồn tại."
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Quay về trang chủ
          </Button>
        }
      />
    </div>
  );
}

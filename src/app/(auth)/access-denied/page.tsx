'use client';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

export default function AccessDeniedPage() {
  const router = useRouter();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập vào trang này."
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Quay về trang chủ
          </Button>
        }
      />
    </div>
  );
}

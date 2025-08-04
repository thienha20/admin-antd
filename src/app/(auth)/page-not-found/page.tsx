'use client';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
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
        status="404"
        title="404"
        subTitle="Không tìm thấy trang này."
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Quay về trang chủ
          </Button>
        }
      />
    </div>
  );
}

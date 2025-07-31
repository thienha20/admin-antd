'use client';
import { Card, Tabs } from 'antd';
import BasicInfoForm from '@/components/ProfileEdit/BasicInfoForm';
import SecuritySettings from '@/components/ProfileEdit/SecuritySettings';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  return (
    <div>
      <Card>
        <Tabs activeKey={'1'}
              items={[{
                title: 'Thông tin cá nhân',
                children: <BasicInfoForm/>,
              }, {
                title: 'Bảo mật',
                children: <SecuritySettings/>,
              }].map((item, i) => {
                const id = String(i + 1);
                return {
                  key: id,
                  label: item.title,
                  children: item.children,
                };
              })}
              onChange={() => router.push('/profile/password')}>
        </Tabs>
      </Card>
    </div>
  );
}

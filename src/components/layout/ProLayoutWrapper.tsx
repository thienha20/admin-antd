'use client';

import {
  UserOutlined,
  LogoutOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown, Grid } from 'antd';
import { checkPermission, permissions } from '@/utils/permission';
import { getPermissionKey, MenuType } from '@/components/layout/Menu';
import { UserContext } from '@/app/contexts/UserProvider';
import CustomFooter from '@/components/layout/Footer';

const DynamicSettingDrawer = dynamic(() => import('./SettingDrawerClient'), {
  ssr: false,
});
const DynamicProLayout = dynamic(() => import('./ProLayoutClient'), {
  ssr: false,
});


const CMSLogo = () => (
  <>
    <svg
      width="36"
      height="36"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cmsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe"/>
          <stop offset="100%" stopColor="#00f2fe"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#cmsGradient)"/>
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        fill="#fff"
        fontSize="32"
        fontWeight="bold"
        dy=".3em"
      >
        AI
      </text>
    </svg>
    <span
      style={{
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 600,
        background: 'linear-gradient(to right, #1890ff, #40a9ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
        Chat Bot
      </span>
  </>
);

export default function ProLayoutWrapper({children}: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [menuData, setMenuData] = useState<MenuType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {me, user} = useContext(UserContext);
  const pathname = usePathname();
  const {useBreakpoint} = Grid;
  const screens = useBreakpoint();
  const contentPadding = screens.md ? 20 : 5;

  // useEffect(() => {
  //   me().then((user) => {
  //     const params = new URLSearchParams(window.location.search);
  //     if (user.userId) {
  //       const permission: boolean = checkPermission(user, getPermissionKey());
  //       if (!permission) {
  //         router.push('/access-denied');
  //       }
  //     } else {
  //       if (!params || params.toString() == '') {
  //         router.push('/login');
  //       } else {
  //         router.push('/login?redirect=' + decodeURIComponent(window.location.href));
  //       }
  //     }
  //     setLoading(false);
  //   });
  // }, [me, router]);
  //
  // useEffect(() => {
  //   setMenuData(permissions(user));
  // }, [user]);

  return (
    <>
      <DynamicProLayout
        {...settings}
        loading={loading}
        siderWidth={256}
        title=""
        logo={<CMSLogo/>}
        layout="mix"
        fixSiderbar
        avatarProps={{
          icon: <UserOutlined/>,
          title: `${user.first_name}${user.first_name ? ` ${user.first_name}` : ''}`,
          size: 'small',
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'user',
                      label: 'Thông tin tài khoản',
                      icon: <UserOutlined/>,
                      onClick: () => router.push('/profile'),
                    },
                    {
                      key: 'password',
                      label: 'Cập nhật mật khẩu',
                      icon: <SafetyOutlined/>,
                      onClick: () => router.push('/profile/password'),
                    },
                    {
                      type: 'divider',
                    },
                    {
                      icon: <LogoutOutlined color={'red'}/>,
                      key: 'logout',
                      label: 'Đăng xuất',
                      danger: true,
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}

        location={{pathname}} // ← đây là điều quan trọng để active menu
        menuItemRender={(item, dom) => (
          item.path ? <Link href={item.path}>{dom}</Link> : dom
        )}
        route={{
          path: '/',
          routes: menuData,
        }}
        contentStyle={{
          padding: contentPadding,
        }}
        footerRender={() => <CustomFooter />}
      >
        {children}
      </DynamicProLayout>
      {process.env.NEXT_PUBLIC_APP_ENV === 'development' && <DynamicSettingDrawer
        pathname="/"
        enableDarkTheme
        settings={settings}
        onSettingChange={(newSettings) => setSettings(newSettings)}
        getContainer={false} // nếu không dùng portal
        disableUrlParams={true}
      />}
    </>
  );
}

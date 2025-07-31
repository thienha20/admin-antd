'use client';

import {
  DashboardOutlined,
  ContainerOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  WechatOutlined,
  LogoutOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import {Dropdown, Grid } from 'antd';

const DynamicSettingDrawer = dynamic(() => import('./SettingDrawerClient'), {
  ssr: false,
});
const DynamicProLayout = dynamic(() => import('./ProLayoutClient'), {
  ssr: false,
});

const menuData = [
  {
    path: '/',
    name: 'Dashboard',
    icon: <DashboardOutlined/>,
  },
  {
    path: '/chat-histories',
    name: 'Lịch sử chat',
    icon: <WechatOutlined/>,
  },
  {
    path: '/subscribe',
    name: 'Đánh nhãn dữ liệu',
    icon: <ContainerOutlined/>,
    routes: [
      {
        path: '/subscribe/faqs',
        name: 'Hỏi đáp',
        icon_path: <QuestionCircleOutlined/>,
        permission: 'faq.index',
      },
      {
        path: '/subscribe/documents',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Tài liệu nhập',
        permission: 'document.index',
      },
      {
        path: '/subscribe/files',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Tài liệu file',
        permission: 'file.index',
      },
      {
        path: '/subscribe/voices',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Tài liệu âm thanh',
        permission: 'voice.index',
      },
      {
        path: '/subscribe/ocrs',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Tài liệu hình ảnh',
        permission: 'ocr.index',
      },
      {
        path: '/categories',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Nhóm tài liệu',
        permission: 'category.index',
      },
    ],
  },
  {
    path: '/user-manage',
    name: 'Quản lý tài khoản',
    icon: <UserOutlined/>,
    routes: [
      {
        path: '/users',
        name: 'Tài khoản',
        permission: 'user.index',
      },
      {
        path: '/user-groups',
        name: 'Phân quyền',
        permission: 'usergroup.index',
      },
    ],

  },
  {
    path: '/settings',
    name: 'Cấu hình',
    icon: <SettingOutlined/>,
  },
];

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
  const [settings, setSettings] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const {useBreakpoint} = Grid;
  const screens = useBreakpoint();
  const contentPadding = screens.md ? 20 : 5;
  return (
    <>
      <DynamicProLayout
        {...settings}
        title=""
        logo={<CMSLogo/>}
        layout="mix"
        fixSiderbar
        avatarProps={{
          icon: <UserOutlined/>,
          title: 'Serati Ma',
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
                      onClick: () => router.push('/profile')
                    },
                    {
                      key: 'password',
                      label: 'Cập nhật mật khẩu',
                      icon: <SafetyOutlined/>,
                      onClick: () => router.push('/profile/password')
                    },
                    {
                      type: 'divider'
                    },
                    {
                      icon: <LogoutOutlined color={'red'}/>,
                      key: 'logout',
                      label: 'Đăng xuất',
                      danger: true
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

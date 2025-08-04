import {
  ContainerOutlined,
  DashboardOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import React, { ReactElement } from 'react';

export type MenuType = {
  path: string,
  name: string,
  icon?: ReactElement,
  icon_path?: ReactElement,
  permission?: string,
  routes?: MenuType[]
}

export const pathPermission: Record<string, string> = {
  '/chat-histories': 'chatHistory.index.get',
  '/subscribe/faqs': 'faq.index.get',
  '/subscribe/faqs/create': 'faq.index.post',
  '/subscribe/faqs/update/*': 'faq.index.post',
  '/subscribe/documents': 'document.index.get',
  '/subscribe/documents/create': 'document.index.post',
  '/subscribe/documents/update/*': 'document.index.post',
  '/subscribe/files': 'file.index.get',
  '/subscribe/files/create': 'file.index.post',
  '/subscribe/files/update/*': 'file.index.post',
  '/subscribe/ocrs': 'ocr.index.get',
  '/subscribe/ocrs/create': 'ocr.index.post',
  '/subscribe/ocrs/update/*': 'ocr.index.post',
  '/subscribe/voices': 'voice.index.get',
  '/subscribe/voices/create': 'voice.index.post',
  '/subscribe/voices/update/*': 'voice.index.post',
  '/categories': 'category.index.get',
  '/categories/create': 'category.index.post',
  '/categories/update/*': 'category.index.post',
  '/users': 'user.index.get',
  '/users/create': 'user.index.post',
  '/users/update/*': 'user.index.post',
  '/user-groups': 'userGroup.index.get',
  '/user-groups/create': 'userGroup.index.post',
  '/user-groups/update/*': 'userGroup.index.post',
};

export const getPermissionKey = (key?: string): string => {
  const pathname = key ?? window.location.pathname;
  if (pathPermission[pathname.toLowerCase()]) return pathPermission[pathname.toLowerCase()];
  for (const k in pathPermission) {
    if (k.indexOf('*') > 0) {
      const regexPattern = '^' + k.replace('*', '[^/]+') + '$';
      const regex = new RegExp(regexPattern);
      if (regex.test(pathname)) {
        return pathPermission[k];
      }
    }
  }
  return '';
};

export const menuData: MenuType[] = [
  {
    path: '/',
    name: 'Dashboard',
    icon: <DashboardOutlined/>,
  },
  {
    path: '/chat-histories',
    name: 'Lịch sử chat',
    icon: <WechatOutlined/>,
    permission: getPermissionKey('/chat-histories'),
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
        permission: getPermissionKey('/subscribe/faqs'),
      },
      {
        path: '/subscribe/documents',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Tài liệu nhập',
        permission: getPermissionKey('/subscribe/documents'),
      },
      {
        path: '/subscribe/files',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Tài liệu file',
        permission: getPermissionKey('/subscribe/files'),
      },
      {
        path: '/subscribe/voices',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Tài liệu âm thanh',
        permission: getPermissionKey('/subscribe/voices'),
      },
      {
        path: '/subscribe/ocrs',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Tài liệu hình ảnh',
        permission: getPermissionKey('/subscribe/ocrs'),
      },
      {
        path: '/categories',
        icon_path: <QuestionCircleOutlined/>,
        name: 'Nhóm tài liệu',
        permission: getPermissionKey('/categories'),
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
        permission: getPermissionKey('/users'),
      },
      {
        path: '/user-groups',
        name: 'Phân quyền',
        permission: getPermissionKey('/user-groups'),
      },
    ],
  },
  {
    path: '/settings',
    name: 'Cấu hình',
    icon: <SettingOutlined/>,
    permission: getPermissionKey('/settings'),
  },
];




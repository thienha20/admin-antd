'use client';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React from 'react';

interface BreadcrumbItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
}

interface CustomBreadcrumbProps {
  items: BreadcrumbItem[];
  homeItem?: BreadcrumbItem; // Item trang chủ (tuỳ chọn)
  style?: React.CSSProperties;
  className?: string;
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({
                                                             items = [],
                                                             homeItem = {
                                                               title: 'Trang chủ',
                                                               href: '/',
                                                               icon: <HomeOutlined />,
                                                             },
                                                             style,
                                                             className,
                                                           }) => {
  const breadcrumbItems: ItemType[] = [
    // Item trang chủ mặc định
    {
      title: (
        <Link href={homeItem.href || '/'}>
          {homeItem.icon} {homeItem.title}
        </Link>
      ),
      key: 0
    },
    // Các item truyền vào
    ...items.map((item, index) => ({
      title: item.href ? (
        <Link href={item.href} >{item.icon} {item.title}</Link>
      ) : (
        <span>{item.icon} {item.title}</span>
      ),
      key: `breadcrumbItems-${index}`,
    })),
  ];

  return (
    <Breadcrumb
      items={breadcrumbItems}
      style={{ marginBottom: 16, ...style }}
      className={className}
    />
  );
};

export default CustomBreadcrumb;
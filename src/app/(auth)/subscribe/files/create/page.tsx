'use client';
import CustomBreadcrumb from '@/components/Breadcrumb';
import React, { useMemo } from 'react';
import FileCreateSection from '@/components/sections/file/create';

export default function FileCreatePage() {
  const breadcrumbItems = useMemo(() => {
    return [
      {title: 'Danh sách file', href: '/subscribe/files'},
      {title: 'Thêm file'}, // Không có href => không click được
    ];
  }, []);
  return (
    <div>
      <CustomBreadcrumb
        items={breadcrumbItems}
        style={{padding: '12px 16px'}}
      />
      <FileCreateSection />
    </div>
  );
}

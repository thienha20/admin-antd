'use client';
import React, { useMemo } from 'react';
import CustomBreadcrumb from '@/components/Breadcrumb';
import FileUpdateSection from '@/components/sections/file/update';

export default function FileUpdatePage() {
  const breadcrumbItems = useMemo(() => {
    return [
      {title: 'Danh sách file', href: '/subscribe/files'},
      {title: 'Cập nhật File'},
    ];
  }, []);
  return (
    <div>
      <CustomBreadcrumb
        items={breadcrumbItems}
        style={{padding: '12px 16px'}}
      />
      <FileUpdateSection data={{
        description: 'test 1',
        categoryId: 5,
        filePath: '/aaa/sss.doc',
      }}/>
    </div>
  );
}

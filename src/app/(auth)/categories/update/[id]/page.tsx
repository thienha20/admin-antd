'use client';
import React, { useMemo } from 'react';
import CustomBreadcrumb from '@/components/Breadcrumb';
import CategoryUpdateSection from '@/components/sections/file/update';

export default function CategoryUpdatePage() {
  const breadcrumbItems = useMemo(() => {
    return [
      {title: 'danh sách danh mục', href:'/categories'},
      {title: 'Cập nhật danh mục'}// Không có href => không click được
    ];
  }, []);
  return (
    <div>
      <CustomBreadcrumb
        items={breadcrumbItems}
        style={{padding: '12px 16px'}}
      />
      <CategoryUpdateSection data={{
        description: 'test 1',
        categoryId: 5,
        filePath: '/aaa/sss.doc'
      }} />
    </div>
  );
}

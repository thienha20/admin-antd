'use client';
import CustomBreadcrumb from '@/components/Breadcrumb';
import React, { useMemo } from 'react';
import CategoryCreateSection from '@/components/sections/category/create';

export default function CategoryCreatePage() {
  const breadcrumbItems = useMemo(() => {
    return [
      {title: 'Thêm file'}, // Không có href => không click được
    ];
  }, []);
  return (
    <div>
      <CustomBreadcrumb
        items={breadcrumbItems}
        style={{padding: '12px 16px'}}
      />
      <CategoryCreateSection />
    </div>
  );
}

'use client';
import React, { useMemo } from 'react';
import CustomBreadcrumb from '@/components/Breadcrumb';
import { CategorySection } from '@/components/sections/category';


const FileTablePage: React.FC = () => {
  const breadcrumbItems = useMemo(() => {
    return [
      {title: 'Danh sách danh mục'}, // Không có href => không click được
    ];
  }, []);

  return (
    <>
      <CustomBreadcrumb
        items={breadcrumbItems}
        style={{padding: '12px 16px'}}
      />
      <CategorySection />
    </>
  );
};

export default FileTablePage;
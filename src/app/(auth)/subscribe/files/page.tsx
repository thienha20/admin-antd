'use client';
import React, { useMemo } from 'react';
import CustomBreadcrumb from '@/components/Breadcrumb';
import { FileSection } from '@/components/sections/file';


const FileTablePage: React.FC = () => {
  const breadcrumbItems = useMemo(() => {
    return [
      {title: 'Danh sách file'}, // Không có href => không click được
    ];
  }, []);

  return (
    <>
      <CustomBreadcrumb
        items={breadcrumbItems}
        style={{padding: '12px 16px'}}
      />
      <FileSection/>
    </>
  );
};

export default FileTablePage;
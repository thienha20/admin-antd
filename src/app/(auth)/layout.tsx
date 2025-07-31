'use client';
import React from 'react';
import ProLayoutWrapper from '@/components/layout/ProLayoutWrapper';

export default function AuthRootLayout({
                                         children,
                                       }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProLayoutWrapper>
      {children}
    </ProLayoutWrapper>
  );
}

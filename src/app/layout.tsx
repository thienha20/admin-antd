'use client';

import { Roboto } from 'next/font/google';
import './globals.css';
import 'antd/dist/reset.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/utils/get-query-client';
import StoreProvider from '@/app/contexts/StoreProvider';
import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import NextTopLoader from 'nextjs-toploader';
import en_US from 'antd/locale/en_US';
import { ConfigProvider, App as AntdApp } from 'antd';
import { UserProvider } from '@/app/contexts/UserProvider';

const roboto = Roboto({weight: ['400', '500', '700', '900'], subsets: ['vietnamese'], display: 'swap'});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
      <body suppressHydrationWarning={true} className={`${roboto.className}`}>
      <NextTopLoader color="#6273FF"
                     initialPosition={0.08}
                     crawlSpeed={200}
                     height={3}
                     crawl={true}
                     showSpinner={true}
                     easing="ease"
                     speed={200}
                     shadow="0 0 10px #6273FF,0 0 5px #6273FF"
                     template='<div class="bar" role="bar"><div class="peg"></div></div>
      <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                     zIndex={1600}
                     showAtBottom={false}/>

      <AntdRegistry>
        <ConfigProvider locale={en_US}>
          <AntdApp>
            <UserProvider>
              <QueryClientProvider client={getQueryClient()}>
                <React.Fragment key="app-children">
                  {children}
                </React.Fragment>
                {process.env.NEXT_PUBLIC_APP_ENV === 'development' && (
                  <ReactQueryDevtools/>
                )}
              </QueryClientProvider>
            </UserProvider>
          </AntdApp>
        </ConfigProvider>
      </AntdRegistry>
      </body>
      </html>
    </StoreProvider>
  );
}

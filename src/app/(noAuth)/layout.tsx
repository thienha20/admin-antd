'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/contexts/UserProvider';
import FullPageLoader from '@/components/loading';

export default function NoAuthRootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const {me} = useContext(UserContext);

  useEffect(() => {
    me().then((user) => {
      const params = new URLSearchParams(window.location.search);
      if (user.userId) {
        const redirect = params.get('redirect') ?? '/';
        if (redirect) {
          router.push(decodeURIComponent(redirect));
        }
      }
      setLoading(false);
    });
  }, [me, router]);
  return (
    <div>{loading ? <FullPageLoader/> : children}</div>
  );
}

// 'use client';
import React, { useCallback } from 'react';
import api from '@/utils/fetchData';
import { isEmpty } from 'lodash';
import { User } from '@/schemas/user';
import md5 from 'md5';
import { useRouter } from 'next/navigation';

export type LoginResult = {
  user: Partial<User>,
  accessToken: string;
  refreshToken: string;
}

const useAuth = () => {
  const [user, setUser] = React.useState<Partial<User>>({});
  const route = useRouter();
  const signOut = useCallback(() => {
    api.post<boolean>("auth/logout", {}).then(r => {
      if(r) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        route.push('/login')
      }
    });
  }, [route]);

  const signIn = useCallback(async (email: string, password: string) => {
    return await api.post<LoginResult>('/auth/login', {
      email,
      password: md5(password)
    }).then(({user, accessToken, refreshToken}: LoginResult) => {
      if(user.userId) {
        setUser(user);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken );
        return true;
      }
      return false;
    });
  }, []);

  const me = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (token && token !== 'undefined') {
      return await api.postResponse<Partial<User>>('auth/me', {}).then((res) => {
        if (res?.data && !isEmpty((res?.data))) {
          const user = res.data;
          if (user.userId) {
            setUser(user);
          }
          return user;
        } else {
          signOut();
          return {};
        }
      }).catch(() => {
        return {};
      });
    } else {
      return {};
    }
  }, [signOut]);

  return {
    user,
    me,
    signOut,
    signIn,
    setUser
  };
};

export default useAuth;
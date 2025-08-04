'use client';
import React, { createContext } from 'react';
import useAuth from '@/hooks/use-auth';
import { User } from '@/schemas/user';

export interface AuthContext {
  signIn: (email: string, password: string) => Promise<boolean>;
  user: Partial<User>;
  signOut: () => void;
  me: () => Promise<Partial<User>>;
  setUser: (user: Partial<User>) => void;
}

// ✅ Default context
export const UserContext = createContext<AuthContext>({
  signIn: async () => false,
  signOut: () => {},
  me: async () => ({}),
  user: {},
  setUser: () => {},
});

// ✅ Thêm kiểu cho children
export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    signIn: authSignIn,
    user,
    signOut: authSignOut,
    me: authMe,
    setUser: authSetUser,
  } = useAuth();

  const signIn = (email: string, password: string) => authSignIn(email, password);
  const signOut = () => authSignOut();
  const me = () => authMe();
  const setUser = (user: Partial<User>) => authSetUser(user);

  return (
    <UserContext.Provider value={{ user, signIn, signOut, me, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

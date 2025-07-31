import { User } from '@/schemas/user';
import api from '@/utils/fetchData';
import { Response } from '@/schemas/query';
import md5 from 'md5';

export const actionLogin = async (email: string, password: string) => {
  return await api.post<Partial<User>>('/auth/login', {
    email,
    password,
  });
};

export const actionAccount = async (data: Partial<User>) => {
  return await api.post<Partial<User>>('/auth/profile-update', {
    ...data,
  });
};

export const actionChangePassword = async (oldPassword: string, newPassword: string) => {
  return await api.post<Response<boolean>>('/auth/profile-password', {
    oldPass: md5(oldPassword),
    newPass: md5(newPassword),
  });
};

export const actionForgotPassword = async (email: string) => {
  return await api.post<Response<boolean>>('/auth/forgot', {
    email,
  });
};

export const actionResetPassword = async (newPassword: string, secret: string) => {
  return await api.patch<User>('/auth/update-password', {
    newPass: md5(newPassword),
    secret,
  });
};

export const actionDeleteAccount = async (userId: number, secret: string) => {
  return await api.post<boolean>('/auth/delete-account/' + userId, {
    secret,
  });
};

export const actionRegisterAccount = async (data: Partial<User>) => {
  return await api.post<boolean>('/auth/register', {
    ...data,
  });
};
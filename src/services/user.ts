import { Pagination, UserParam } from '@/schemas/query';
import { User } from '@/schemas/user';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetUsers = async (params?: UserParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<User>>(`/users${queryString}`);
};


export const actionCreateUser = async (data: User) => {
  return await api.post<User>(`/users`, {
    ...data,
  });
};

export const actionGetUser = async (userId: bigint) => {
  return await api.get<User>(`/users/${userId}`);
};

export const actionUpdateUser = async (userId: bigint, data: User) => {
  return await api.put<User>(`/users/${userId}`, {
    ...data,
  });
};

export const actionDeleteUser = async (userId: bigint) => {
  return await api.delete<boolean>(`/users/${userId}`);
};

export const actionDeleteUsers = async (userIds: bigint[]) => {
  return await api.delete<boolean>(`/users?ids=${userIds.join(',')}`);
};
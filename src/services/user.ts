import { FindManyFilter, Pagination } from '@/interfaces/query';
import { Product, User } from '@/interfaces/prisma';
import api from '@/utils/fetchData';

export const actionGetUsers = async (filter?: FindManyFilter<User>) => {
  return await api.get<Pagination<User>>(`/users?filter=${JSON.stringify(filter)}`);
};


export const actionCreateUser = async (data: Partial<User>) => {
  return await api.post<User>(`/users`, {
    ...data,
  });
};

export const actionGetUser = async (id: number, filter?: FindManyFilter<User>) => {
  if(filter) {
    return await api.get<User>(`/users/${id}?filter=${JSON.stringify(filter)}`)
  }
  return await api.get<User>(`/users/${id}`);
};

export const actionUpdateUser = async (userId: number, data: Partial<User>) => {
  return await api.put<User>(`/users/${userId}`, {
    ...data,
  });
};

export const actionDeleteUser = async (userId: number) => {
  return await api.delete<boolean>(`/users/${userId}`);
};

export const actionDeleteUsers = async (userIds: number[]) => {
  return await api.delete<boolean>(`/users?ids=${userIds.join(',')}`);
};
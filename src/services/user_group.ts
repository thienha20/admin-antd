import { Pagination, UserGroupParam } from '@/schemas/query';
import { UserGroup } from '@/schemas/user';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetUserGroups = async (params?: UserGroupParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<UserGroup>>(`/user-groups${queryString}`);
};


export const actionCreateUserGroup = async (data: UserGroup) => {
  return await api.post<UserGroup>(`/user-groups`, {
    ...data,
  });
};

export const actionGetUserGroup = async (groupId: number) => {
  return await api.get<UserGroup>(`/user-groups/${groupId}`);
};

export const actionUpdateUserGroup = async (groupId: number, data: UserGroup) => {
  return await api.put<UserGroup>(`/user-groups/${groupId}`, {
    ...data,
  });
};

export const actionDeleteUserGroup = async (groupId: number) => {
  return await api.delete<boolean>(`/user-groups/${groupId}`);
};

export const actionDeleteUserGroups = async (groupIds: number[]) => {
  return await api.delete<boolean>(`/user-groups?ids=${groupIds.join(',')}`);
};
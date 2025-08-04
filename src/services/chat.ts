import { Pagination, ChatParam } from '@/schemas/query';
import { ChatType } from '@/schemas/chat';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetChats = async (params?: ChatParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<ChatType>>(`/chat${queryString}`);
};


export const actionCreateChat = async (data: ChatType) => {
  return await api.post<ChatType>(`/chat`, {
    ...data,
  });
};

export const actionGetChat = async (id: string) => {
  return await api.get<ChatType>(`/chat/${id}`);
};

export const actionUpdateChat = async (id: string, data: ChatType) => {
  return await api.put<ChatType>(`/chat/${id}`, {
    ...data,
  });
};

export const actionDeleteChat = async (id: string) => {
  return await api.delete<boolean>(`/chat/${id}`);
};

export const actionDeleteChats = async (ids: string[]) => {
  return await api.delete<boolean>(`/chat?ids=${ids.join(',')}`);
};
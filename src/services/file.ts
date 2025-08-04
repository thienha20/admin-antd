import { Pagination, FileParam } from '@/schemas/query';
import { FileType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetFiles = async (params?: FileParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<FileType>>(`/subscribe/files${queryString}`);
};


export const actionCreateFile = async (data: FileType) => {
  return await api.post<FileType>(`/subscribe/files`, {
    ...data,
  });
};

export const actionGetFile = async (id: bigint) => {
  return await api.get<FileType>(`/subscribe/files/${id}`);
};

export const actionUpdateFile = async (id: bigint, data: FileType) => {
  return await api.put<FileType>(`/subscribe/files/${id}`, {
    ...data,
  });
};

export const actionDeleteFile = async (id: bigint) => {
  return await api.delete<boolean>(`/subscribe/files/${id}`);
};

export const actionDeleteFiles = async (ids: bigint[]) => {
  return await api.delete<boolean>(`/subscribe/files?ids=${ids.join(',')}`);
};
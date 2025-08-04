import { Pagination, FileParam } from '@/schemas/query';
import { FileType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { convertStringData, toQuery } from '@/utils/change-case';

export const actionGetFiles = async (params?: FileParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<FileType>>(`/subscribe/files${queryString}`);
};


export const actionCreateFile = async (data: FileType, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, convertStringData(value));
  }
  return await api.post<FileType>(`/subscribe/files`, {
    ...data,
  }, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const actionGetFile = async (id: bigint) => {
  return await api.get<FileType>(`/subscribe/files/${id}`);
};

export const actionUpdateFile = async (id: bigint, data: FileType, file?: File) => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, convertStringData(value));
  }
  return await api.put<FileType>(`/subscribe/files/${id}`, {
    ...data,
  }, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const actionDeleteFile = async (id: bigint) => {
  return await api.delete<boolean>(`/subscribe/files/${id}`);
};

export const actionDeleteFiles = async (ids: bigint[]) => {
  return await api.delete<boolean>(`/subscribe/files?ids=${ids.join(',')}`);
};
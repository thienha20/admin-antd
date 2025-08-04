import { Pagination, FileParam } from '@/schemas/query';
import { FileType, OcrType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { convertStringData, toQuery } from '@/utils/change-case';

export const actionGetOcrs = async (params?: FileParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<OcrType>>(`/subscribe/ocrs${queryString}`);
};


export const actionCreateOcr = async (data: FileType, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, convertStringData(value));
  }
  return await api.post<FileType>(`/subscribe/ocrs`, {
    ...data,
  }, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const actionGetOcr = async (id: bigint) => {
  return await api.get<FileType>(`/subscribe/ocrs/${id}`);
};

export const actionUpdateOcr = async (id: bigint, data: FileType, file?: File) => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, convertStringData(value));
  }
  return await api.put<FileType>(`/subscribe/cors/${id}`, {
    ...data,
  }, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const actionDeleteOcr = async (id: bigint) => {
  return await api.delete<boolean>(`/subscribe/ocrs/${id}`);
};

export const actionDeleteOcrs = async (ids: bigint[]) => {
  return await api.delete<boolean>(`/subscribe/ocrs?ids=${ids.join(',')}`);
};
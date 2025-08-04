import { Pagination, FileParam } from '@/schemas/query';
import { FileType, VoiceType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { convertStringData, toQuery } from '@/utils/change-case';

export const actionGetVoices = async (params?: FileParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<VoiceType>>(`/subscribe/voices${queryString}`);
};


export const actionGetVoice = async (id: bigint) => {
  return await api.get<FileType>(`/subscribe/voices/${id}`);
};

export const actionUpdateVoice = async (id: bigint, data: FileType, file?: File) => {
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

export const actionDeleteVoice = async (id: bigint) => {
  return await api.delete<boolean>(`/subscribe/voices/${id}`);
};

export const actionDeleteVoices = async (ids: bigint[]) => {
  return await api.delete<boolean>(`/subscribe/voices?ids=${ids.join(',')}`);
};
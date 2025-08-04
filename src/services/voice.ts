import { Pagination, FileParam } from '@/schemas/query';
import { VoiceType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetVoices = async (params?: FileParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<VoiceType>>(`/subscribe/voices${queryString}`);
};


export const actionCreateVoice = async (data: VoiceType) => {
  return await api.post<VoiceType>(`/subscribe/voices`, {
    ...data,
  });
};

export const actionGetVoice = async (id: bigint) => {
  return await api.get<VoiceType>(`/subscribe/voices/${id}`);
};

export const actionUpdateVoice = async (id: bigint, data: VoiceType) => {
  return await api.put<VoiceType>(`/subscribe/voices/${id}`, {
    ...data,
  });
};

export const actionDeleteVoice = async (id: bigint) => {
  return await api.delete<boolean>(`/subscribe/voices/${id}`);
};

export const actionDeleteVoices = async (ids: bigint[]) => {
  return await api.delete<boolean>(`/subscribe/voices?ids=${ids.join(',')}`);
};
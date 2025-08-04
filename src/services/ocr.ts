import { Pagination, FileParam } from '@/schemas/query';
import { OcrType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetOcrs = async (params?: FileParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<OcrType>>(`/subscribe/ocrs${queryString}`);
};


export const actionCreateOcr = async (data: OcrType) => {
  return await api.post<OcrType>(`/subscribe/ocrs`, {
    ...data,
  });
};

export const actionGetOcr = async (id: bigint) => {
  return await api.get<OcrType>(`/subscribe/ocrs/${id}`);
};

export const actionUpdateOcr = async (id: bigint, data: OcrType) => {
  return await api.put<OcrType>(`/subscribe/ocrs/${id}`, {
    ...data,
  });
};

export const actionDeleteOcr = async (id: bigint) => {
  return await api.delete<boolean>(`/subscribe/ocrs/${id}`);
};

export const actionDeleteOcrs = async (ids: bigint[]) => {
  return await api.delete<boolean>(`/subscribe/ocrs?ids=${ids.join(',')}`);
};
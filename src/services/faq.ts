import { Pagination, FaqParam } from '@/schemas/query';
import { FaqType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetFaqs = async (params?: FaqParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<FaqType>>(`/faqs${queryString}`);
};


export const actionCreateFaq = async (data: FaqType) => {
  return await api.post<FaqType>(`/faqs`, {
    ...data,
  });
};

export const actionGetFaq = async (id: bigint) => {
  return await api.get<FaqType>(`/faqs/${id}`);
};

export const actionUpdateFaq = async (id: bigint, data: FaqType) => {
  return await api.put<FaqType>(`/faqs/${id}`, {
    ...data,
  });
};

export const actionDeleteFaq = async (id: bigint) => {
  return await api.delete<boolean>(`/faqs/${id}`);
};

export const actionDeleteFaqs = async (ids: bigint[]) => {
  return await api.delete<boolean>(`/faqs?ids=${ids.join(',')}`);
};
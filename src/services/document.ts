import { Pagination, DocumentParam } from '@/schemas/query';
import { DocumentType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetDocuments = async (params?: DocumentParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<DocumentType>>(`/subscribe/document${queryString}`);
};


export const actionCreateDocument = async (data: DocumentType) => {
  return await api.post<DocumentType>(`/subscribe/document`, {
    ...data,
  });
};

export const actionGetDocument = async (id: bigint) => {
  return await api.get<DocumentType>(`/subscribe/document/${id}`);
};

export const actionUpdateDocument = async (id: bigint, data: DocumentType) => {
  return await api.put<DocumentType>(`/subscribe/document/${id}`, {
    ...data,
  });
};

export const actionDeleteDocument = async (id: bigint) => {
  return await api.delete<boolean>(`/subscribe/document/${id}`);
};

export const actionDeleteDocuments = async (ids: bigint[]) => {
  return await api.delete<boolean>(`/subscribe/document?ids=${ids.join(',')}`);
};
import { Pagination, CategoryParam } from '@/schemas/query';
import { CategoryType } from '@/schemas/subcribe';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetCategories = async (params?: CategoryParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<CategoryType>>(`/categories${queryString}`);
};


export const actionCreateCategory = async (data: CategoryType) => {
  return await api.post<CategoryType>(`/categories`, {
    ...data,
  });
};

export const actionGetCategory = async (id: number) => {
  return await api.get<CategoryType>(`/categories/${id}`);
};

export const actionUpdateCategory = async (id: number, data: CategoryType) => {
  return await api.put<CategoryType>(`/categories/${id}`, {
    ...data,
  });
};

export const actionDeleteCategory = async (id: number) => {
  return await api.delete<boolean>(`/categories/${id}`);
};

export const actionDeleteCategories = async (ids: number[]) => {
  return await api.delete<boolean>(`/categories?ids=${ids.join(',')}`);
};
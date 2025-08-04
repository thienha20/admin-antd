import { Pagination, SettingParam } from '@/schemas/query';
import { Setting } from '@/schemas/setting';
import api from '@/utils/fetchData';
import { toQuery } from '@/utils/change-case';

export const actionGetSettings = async (params?: SettingParam) => {
  const queryString = params ? `?${toQuery(params)}` : '';
  return await api.get<Pagination<Setting>>(`/settings${queryString}`);
};


export const actionCreateSetting = async (data: Setting) => {
  return await api.post<Setting>(`/settings`, {
    ...data,
  });
};

export const actionGetSetting = async (key: string) => {
  return await api.get<Setting>(`/settings/${key}`);
};

export const actionUpdateSetting = async (key: string, data: Setting) => {
  return await api.put<Setting>(`/settings/${key}`, {
    ...data,
  });
};

export const actionDeleteSetting = async (key: string) => {
  return await api.delete<boolean>(`/settings/${key}`);
};

export const actionDeleteSettings = async (key: string[]) => {
  return await api.delete<boolean>(`/settings?keys=${key.join(',')}`);
};
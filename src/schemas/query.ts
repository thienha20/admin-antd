export interface QueryParams {
  q?: string;
  id?: number | string;
  ids?: number[] | string[];
  status?: string;
  created_from?: string,
  created_to?: string,
  created_at?: string,
  updated_from?: string,
  updated_to?: string,
  updated_at?: string,
  pageSize?: number;
  page?: number;
  order?: string
}

export interface Pagination<T> {
  total: number;
  page?: number;
  limit?: number;
  items: T[];
}

export interface Response<T> {
  data?: T;
  error?: number | string | string[];
  message?: string | string[];
  statusCode: number;
}

export interface UserParam extends QueryParams {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  group_id?: number;
  group_ids?: number[];
}

export interface UserGroupParam extends QueryParams {
  name?: string;
}

export interface FaqParam extends QueryParams {
  answer?: string;
  question?: string;
  category_id?: number;
  category_ids?: number[];
}

export interface CategoryParam extends QueryParams {
  name?: string;
  parent_id?: number;
  parent_ids?: number[];
}

export interface FileParam extends QueryParams {
  description?: string;
  filename?: string;
  file_type?: string;
  file_path?: string;
  extension?: string;
  size?: number;
  category_id?: number;
  category_ids?: number[];
}

export interface DocumentParam extends QueryParams {
  description?: string;
  description_extend?: string;
}

export interface ChatParam extends QueryParams {
  chat_session_id?: string;
  socket_id?: string;
  ip_address?: string;
  role?: string;
  message?: string;
}

export interface SettingParam extends QueryParams {
  key?: string;
  keys?: string[];
}

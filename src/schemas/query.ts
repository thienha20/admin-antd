export type WhereInput<T> = {
  AND?: WhereInput<T> | WhereInput<T>[]
  OR?: WhereInput<T>[]
  NOT?: WhereInput<T> | WhereInput<T>[]
} & { [key in keyof T | '_count']?: boolean | object | string | number | bigint | null }

type SortOrder = 'asc' | 'desc' | string | { '_count': 'asc' | 'desc' } | Record<string, any>

export type OrderBy<T> = { [key in keyof T]?: SortOrder  }

export interface FindManyFilter<T> {
  distinct?: Array<string>;
  select?: { [key in keyof T | '_count']?: boolean | object } | null;
  include?: { [key in keyof T | '_count']?: boolean | object } | null;
  where?: WhereInput<T>;
  orderBy?: OrderBy<T> | OrderBy<T>[];
  limit?: number;
  page?: number;
  cache?: boolean;
}

export interface FindUniqueFilter<T> {
  select?: { [key in keyof T | '_count']?: boolean | object } | null;
  include?: { [key in keyof T | '_count']?: boolean | object } | null;
}

export interface FindOneFilter<T> {
  select?: { [key in keyof T | '_count']?: boolean | object } | null;
  include?: { [key in keyof T | '_count']?: boolean | object } | null;
  where?: WhereInput<T>;
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
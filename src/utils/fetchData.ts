import axios, { AxiosError, AxiosResponse } from 'axios';
import { urlNoAuth } from '@/configs/url';

declare const window: any;

function checkLinkNoToken(link: string | undefined, method: string = 'get'): boolean {
  return urlNoAuth.some((item: string[]) => (link?.startsWith(item[0]) || link?.startsWith("/" + item[0])) && item[1].includes(method.toLowerCase()));
}

export const API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:4001';

const Service = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    // 'Accept-Encoding': 'gzip, deflate, br',
  },
});

Service.interceptors.request.use(
  config => {
    if (!checkLinkNoToken(config.url, config.method)) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.href);
      }
      config.headers['x-lang'] = localStorage.getItem('x-lang') ?? 'vi';
    }
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    Promise.reject(error.response || error.message).then();
  },
);


Service.interceptors.response.use(
  response => response,
  async (error: any) => {
    if (error.response?.status === 401 && error.config.url === 'auth/refresh-token') {
      console.log('Expired Token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // localStorage.removeItem('refresh');
      window.isRefresh = null;
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    if (
      refreshToken &&
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      const isRefreshing = window.isRefresh; // localStorage.getItem('refresh');
      if (isRefreshing) {
        try {
          originalRequest.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
          return Service.request(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
      }

      originalRequest._retry = true;
      window.isRefresh = 1;
      // localStorage.setItem('refresh', '1');

      return await Service
        .post(`auth/refresh-token`, {
          refreshToken: localStorage.getItem('refreshToken'),
          accessToken: localStorage.getItem('accessToken'),
        })
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            if (res.data.statusCode === 401) {
              console.log('Expired Token');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
            } else {
              localStorage.setItem('accessToken', res.data.accessToken);
              localStorage.setItem('refreshToken', res.data.refreshToken);
              axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
              return Service.request(originalRequest);
            }
          }
        })
        .catch((e) => {
          if ((e.response?.status && e.response?.status === 401) || e.response?.data.statusCode === 401) {
            console.log('Expired Token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        })
        .finally(() => {
          window.isRefresh = null;
        });
    }
    return Promise.reject(error);
  },
);

// export default Service;

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

const api = {
  get: <T>(url: string, configs?: Record<string, any>) =>
    Service.get<T>(url, configs).then(responseBody),
  getResponse: <T>(url: string, configs?: Record<string, any>) =>
    Service.get<T>(url, configs).then(<T>(response: AxiosResponse<T>) => response),
  post: <T>(url: string, body: unknown, configs?: Record<string, any>) =>
    Service.post<T>(url, body, configs).then(responseBody),
  postResponse: <T>(url: string, body: unknown, configs?: Record<string, any>) =>
    Service.post<T>(url, body, configs).then(<T>(response: AxiosResponse<T>) => response),
  put: <T>(url: string, body: unknown, configs?: Record<string, any>) =>
    Service.put<T>(url, body, configs).then(responseBody),
  patch: <T>(url: string, body: unknown, configs?: Record<string, any>) =>
    Service.patch<T>(url, body, configs).then(responseBody),
  delete: <T>(url: string, configs?: Record<string, any>) =>
    Service.delete<T>(url, configs).then(responseBody),
};

export default api;
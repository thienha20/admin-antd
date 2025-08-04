import axios, { AxiosError, AxiosResponse } from 'axios';
import { urlNoAuth } from '@/configs/url';

declare const window: any;

function checkLinkNoToken(link: string | undefined, method: string = 'get'): boolean {
  return urlNoAuth.some(
    (item: string[]) =>
      (link?.startsWith(item[0]) || link?.startsWith("/" + item[0])) &&
      item[1].includes(method.toLowerCase())
  );
}

const API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:4001';

const Service = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

// Helper để clear token & redirect
function removeTokenAndRedirect() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login?redirect=' + encodeURIComponent(window.location.href);
}

// Request Interceptor
Service.interceptors.request.use(
  config => {
    if (!checkLinkNoToken(config.url, config.method)) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        removeTokenAndRedirect();
      }
      config.headers['x-lang'] = localStorage.getItem('x-lang') ?? 'vi';
    }
    return config;
  },
  (error: AxiosError) => {
    console.error(error);
    return Promise.reject(error.response || error.message);
  }
);

// Biến giữ promise refresh đang chờ
let refreshTokenPromise: Promise<AxiosResponse> | null = null;

// Response Interceptor
Service.interceptors.response.use(
  response => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest: any = error.config;
    const status = error.response?.status;

    // Nếu refresh-token cũng 401 => đăng xuất
    if (status === 401 && originalRequest?.url?.includes('auth/refresh-token')) {
      console.warn('Refresh token expired');
      removeTokenAndRedirect();
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem('refreshToken');

    if (status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = Service.post('auth/refresh-token', {
          refreshToken,
          accessToken: localStorage.getItem('accessToken'),
        });
      }

      try {
        const res = await refreshTokenPromise;
        refreshTokenPromise = null;

        if (res?.data?.statusCode === 401) {
          console.warn('Refresh token response is 401');
          removeTokenAndRedirect();
          return Promise.reject(error);
        }

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return Service.request(originalRequest);

      } catch (err: any) {
        refreshTokenPromise = null;
        if (err.response?.status === 401 || err.response?.data?.statusCode === 401) {
          console.warn('Refresh token failed');
          removeTokenAndRedirect();
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// Response body extractor
const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

// API Wrapper
const api = {
  get: <T>(url: string, configs?: Record<string, any>) =>
    Service.get<T>(url, configs).then(responseBody),
  getResponse: <T>(url: string, configs?: Record<string, any>) =>
    Service.get<T>(url, configs),
  post: <T>(url: string, body: unknown, configs?: Record<string, any>) =>
    Service.post<T>(url, body, configs).then(responseBody),
  postResponse: <T>(url: string, body: unknown, configs?: Record<string, any>) =>
    Service.post<T>(url, body, configs),
  put: <T>(url: string, body: unknown, configs?: Record<string, any>) =>
    Service.put<T>(url, body, configs).then(responseBody),
  patch: <T>(url: string, body: unknown, configs?: Record<string, any>) =>
    Service.patch<T>(url, body, configs).then(responseBody),
  delete: <T>(url: string, configs?: Record<string, any>) =>
    Service.delete<T>(url, configs).then(responseBody),
};

export default api;

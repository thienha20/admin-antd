export const hasParams = (url: string): boolean => {
  const queryString = url.split('?')[1];
  return queryString ? new URLSearchParams(queryString).toString().length > 0 : false;
};

// ----------------------------------------------------------------------

export function removeLastSlash(pathname: string): string {
  /**
   * Remove last slash
   * [1]
   * @input  = '/dashboard/calendar/'
   * @output = '/dashboard/calendar'
   * [2]
   * @input  = '/dashboard/calendar'
   * @output = '/dashboard/calendar'
   */
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

// ----------------------------------------------------------------------

export function removeParams(url: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);

    return removeLastSlash(urlObj.pathname);
  } catch {
    return url;
  }
}

// ----------------------------------------------------------------------

export function isExternalLink(url: string): boolean {
  return url.startsWith('http');
}


export const pushQueryUrl = (key: string, value: string | null) => {
  const params = new URLSearchParams(window.location.search);
  if (key !== 'page') {
    params.delete('page');
  }
  params.set(key, value ?? '');
  const url = window.location.origin + window.location.pathname;
  history.replaceState(null, '', `${url}?${params.toString()}`);
};

export const removeQueryUrl = (key: string | string[]) => {
  const params = new URLSearchParams(window.location.search);
  if (typeof key === 'string') {
    params.delete(key);
  } else {
    for (const k of key) {
      params.delete(k);
    }
  }
  const url = window.location.origin + window.location.pathname;
  history.replaceState(null, '', `${url}?${params.toString()}`);
};

export const buildQueryUrl = (obj: Record<string, any> | null, page: number = 1) => {
  const url = window.location.origin + window.location.pathname;
  if (!obj) {
    if (page > 1) return url + '?page=' + page;
    return url;
  }
  const params: string[] = [];
  for (const k in obj) {
    if (k == 'created_at' && Array.isArray(obj[k])) {
      params.push(`created_from=${obj[k][0]}`);
      if (obj[k][1]) params.push(`created_to=${obj[k][1]}`);
    } else {
      if (k == 'updated_at' && Array.isArray(obj[k])) {
        params.push(`updated_from=${obj[k][0]}`);
        if (obj[k][1]) params.push(`updated_to=${obj[k][1]}`);
      } else {
        if (Array.isArray(obj[k])) {
          params.push(`${k}=${obj[k].join(',')}`);
        } else {
          if (typeof obj[k] === 'object') {
            params.push(`${k}=${JSON.stringify(obj[k])}`);
          } else {
            params.push(`${k}=${obj[k]}`);
          }
        }
      }
    }
  }
  return url + (params.length > 0 ? `?${params.join('&')}${page > 1 ? `&page=${page}` : ''}` : `${page > 1 ? `?page=${page}` : ''}`);
};

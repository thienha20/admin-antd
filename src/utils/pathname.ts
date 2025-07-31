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
  if(typeof key === 'string'){
    params.delete(key);
  } else {
    for (const k of key) {
      params.delete(k);
    }
  }
  const url = window.location.origin + window.location.pathname;
  history.replaceState(null, '', `${url}?${params.toString()}`);
};


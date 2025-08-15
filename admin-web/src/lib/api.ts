import wretch from 'wretch';

export const api = {
  base: process.env.NEXT_PUBLIC_API_BASE || '/api',
  url: (path: string) => `${process.env.NEXT_PUBLIC_API_BASE || '/api'}${path}`,
};

const httpClient = wretch().headers({ 'Content-Type': 'application/json' }).errorType('json');

export const http = {
  get: <T>(url: string) => httpClient
    .headers({ 'X-Request-ID': getRequestId() })
    .url(url)
    .get()
    .json<T>(),
  post: <T>(url: string, body: unknown) => httpClient
    .headers({ 'X-Request-ID': getRequestId() })
    .url(url)
    .post(body)
    .json<T>(),
  put: <T>(url: string, body: unknown) => httpClient
    .headers({ 'X-Request-ID': getRequestId() })
    .url(url)
    .put(body)
    .json<T>(),
  delete: (url: string) => httpClient
    .headers({ 'X-Request-ID': getRequestId() })
    .url(url)
    .delete()
    .res(),
};

function getRequestId(): string {
  const generate = () => {
    if (typeof crypto !== 'undefined') {
      const c = crypto as Crypto;
      if (typeof c.randomUUID === 'function') {
        return c.randomUUID();
      }
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  };
  if (typeof window === 'undefined') return generate();
  try {
    const key = 'x-request-id';
    let rid = window.localStorage.getItem(key) ?? '';
    if (rid === '') {
      rid = generate();
      window.localStorage.setItem(key, rid);
    }
    return rid;
  } catch {
    return generate();
  }
}



/**
 * Minimal fetch wrapper. Centralizing requests here means:
 *  - the API base URL is one env var, never hardcoded in components
 *  - credentials/headers policy is consistent across every call
 *  - errors are normalized instead of leaking raw fetch rejections
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
};

async function request<T = unknown>(
  path: string,
  { method = 'GET', body, headers = {} }: RequestOptions = {}
): Promise<T | null> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    // 'same-origin' avoids sending cookies to third-party origins.
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: (T & { message?: string }) | null = null;
  try {
    data = await response.json();
  } catch {
    // No JSON body — fine for 204s etc.
  }

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const apiClient = {
  get: <T = unknown>(path: string) => request<T>(path),
  post: <T = unknown>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
  put: <T = unknown>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body }),
  delete: <T = unknown>(path: string) => request<T>(path, { method: 'DELETE' }),
};

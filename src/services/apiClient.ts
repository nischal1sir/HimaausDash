const BASE_URL = (((import.meta as any).env?.VITE_API_BASE_URL as string) || 'https://himaaus-be-2.onrender.com/api').replace(/\/+$/, '');

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  status: number;
  data?: ApiErrorResponse;

  constructor(message: string, status: number, data?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

function getAuthToken(): string | null {
  return localStorage.getItem('token') || localStorage.getItem('auth_token');
}

async function request<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
    ? endpoint
    : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const token = getAuthToken();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data: unknown;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as ApiErrorResponse).message)
        : typeof data === 'object' && data !== null && 'error' in data
        ? String((data as ApiErrorResponse).error)
        : typeof data === 'string' && data.length > 0
        ? data
        : `Request failed with status ${response.status}`;

    throw new ApiError(errorMsg, response.status, typeof data === 'object' ? (data as ApiErrorResponse) : undefined);
  }

  return data as T;
}

export const apiClient = {
  request,
  get: <T = unknown>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T = unknown>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    }),
  put: <T = unknown>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    }),
  patch: <T = unknown>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    }),
  delete: <T = unknown>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;

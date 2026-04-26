import { API_URL } from '../config';

function joinUrl(base, path) {
  const b = String(base || '').replace(/\/+$/, '');
  const p = String(path || '').replace(/^\/+/, '');
  if (!b) return `/${p}`;
  return p ? `${b}/${p}` : b;
}

async function request(method, path, { headers, body } = {}) {
  const url = joinUrl(API_URL, path);
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: body == null ? undefined : JSON.stringify(body),
  });

  const text = await res.text();
  const data = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;

  if (!res.ok) {
    const message = typeof data === 'string' ? data : data?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  get: (path, opts) => request('GET', path, opts),
  post: (path, body, opts) => request('POST', path, { ...(opts || {}), body }),
  put: (path, body, opts) => request('PUT', path, { ...(opts || {}), body }),
  del: (path, opts) => request('DELETE', path, opts),
};


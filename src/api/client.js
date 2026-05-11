import { API_URL } from '../config';

function joinUrl(base, path) {
  const b = String(base || '').replace(/\/+$/, '');
  const p = String(path || '').replace(/^\/+/, '');
  if (!b) return `/${p}`;
  return p ? `${b}/${p}` : b;
}

async function request(method, path, { headers, body, timeoutMs } = {}) {
  const url = joinUrl(API_URL, path);
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeout = timeoutMs && controller
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      body: body == null ? undefined : JSON.stringify(body),
      signal: controller?.signal,
    });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  } finally {
    if (timeout) clearTimeout(timeout);
  }

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

async function uploadRequest(method, path, { headers, body, timeoutMs } = {}) {
  const url = joinUrl(API_URL, path);
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeout = timeoutMs && controller
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(headers || {}),
      },
      body, // FormData
      signal: controller?.signal,
    });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  } finally {
    if (timeout) clearTimeout(timeout);
  }

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
  upload: (path, formData, opts) => uploadRequest('POST', path, { ...(opts || {}), body: formData }),
};

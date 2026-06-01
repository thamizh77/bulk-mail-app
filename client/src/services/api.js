import { getAuthToken } from './AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed. Please try again.');
  }

  return payload;
}

export async function loginAdmin(credentials) {
  const response = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  return response;
}

export async function sendBulkEmail(data) {
  return request('/mail/send', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function getEmailHistory() {
  const response = await request('/mail/history');
  return response.data;
}

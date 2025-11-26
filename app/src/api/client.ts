import { ENV } from '../config/env';

// Token temporal para desarrollo (en producción debe venir de Firebase Auth)
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }
    return response.json();
  },

  post: async (endpoint: string, body: any) => {
    const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }
    return response.json();
  },

  put: async (endpoint: string, body: any) => {
    const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }
    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
    });
    if (response.status === 204) {
      return null; // DELETE exitoso sin contenido
    }
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }
    return response.json();
  },
};

export default apiClient;

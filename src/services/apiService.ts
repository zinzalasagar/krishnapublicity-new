import endPointApi from './endPointApi';

const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const apiService = {
  /**
   * Constructs the full image URL handling relative upload paths and external HTTP links
   */
  getImageUrl: (imagePath?: string, fallback: string = '/main1.jpg'): string => {
    if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '' || imagePath === '/placeholder.jpg' || imagePath.includes('[object')) {
      return fallback;
    }
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    if (imagePath.startsWith('/uploads') || imagePath.startsWith('uploads')) {
      const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
      return `${endPointApi.serverUrl}${cleanPath}`;
    }
    return imagePath;
  },

  /**
   * Perform GET request
   */
  get: async <T = any>(endpoint: string): Promise<T> => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${endPointApi.baseUrl}/${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `GET Request failed with status ${response.status}`);
    }

    return response.json();
  },

  /**
   * Perform POST request
   */
  post: async <T = any>(endpoint: string, data: any): Promise<T> => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${endPointApi.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || `POST Request failed with status ${response.status}`);
    }

    return result;
  },

  /**
   * Perform PUT request
   */
  put: async <T = any>(endpoint: string, data: any): Promise<T> => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${endPointApi.baseUrl}/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || `PUT Request failed with status ${response.status}`);
    }

    return result;
  },

  /**
   * Perform DELETE request
   */
  delete: async <T = any>(endpoint: string): Promise<T> => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${endPointApi.baseUrl}/${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || `DELETE Request failed with status ${response.status}`);
    }

    return result;
  },

  /**
   * Upload File via FormData
   */
  uploadFile: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAuthToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${endPointApi.baseUrl}/${endPointApi.upload}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || `Upload failed with status ${response.status}`);
    }

    const textResult = await response.text();
    try {
      const json = JSON.parse(textResult);
      if (typeof json === 'string') return json;
      if (json.imageUrl) return json.imageUrl;
      if (json.url) return json.url;
      if (json.path) return json.path;
      return textResult;
    } catch {
      return textResult;
    }
  },
};

export default apiService;

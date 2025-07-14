const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
}

// Helper function to get auth headers
function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Formulas API
export const formulasApi = {
  getFormulas: async () => {
    const response = await fetch(`${API_BASE_URL}/formulas`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  createFormula: async (formulaData: {
    name: string;
    description?: string;
    ingredients: any[];
    goals?: string[];
    form?: string;
    dosage?: string;
    estimatedCost?: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/formulas`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(formulaData),
    });
    return handleResponse(response);
  },

  getFormula: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/formulas/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateFormula: async (id: string, formulaData: any) => {
    const response = await fetch(`${API_BASE_URL}/formulas/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(formulaData),
    });
    return handleResponse(response);
  },

  deleteFormula: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/formulas/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Products API
export const productsApi = {
  getProducts: async (params?: { category?: string; search?: string; limit?: number; offset?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/products?${searchParams}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getProduct: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Health Profile API
export const healthProfileApi = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/health/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  createProfile: async (profileData: any) => {
    const response = await fetch(`${API_BASE_URL}/health/profile`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  updateProfile: async (profileData: any) => {
    const response = await fetch(`${API_BASE_URL}/health/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Users API
export const usersApi = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateProfile: async (profileData: any) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },
};

// AI API
export const aiApi = {
  getRecommendations: async (params: {
    healthProfile?: any;
    goals?: string[];
    currentFormula?: any[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/ai/recommendations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(params),
    });
    return handleResponse(response);
  },
};

// API Configuration
// In production on Vercel, use the backend URL; in development use localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? 'https://technologywave-kgyc.vercel.app' 
    : 'http://localhost:8000');

class APIClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Set auth token
  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // Remove auth token
  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Make API request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const headers = {
      ...options.headers,
    };

    // Add auth token if available
    if (token && !options.skipAuth) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        this.removeToken();
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin';
        }
        throw new Error('Unauthorized');
      }

      // Parse response
      const data = await response.json();

      if (!response.ok) {
        // Better error handling for validation errors
        const errorMsg = typeof data.detail === 'string' 
          ? data.detail 
          : JSON.stringify(data.detail || data);
        console.error('API Error Response:', data);
        throw new Error(errorMsg);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(username, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      skipAuth: true,
    });
    this.setToken(data.access_token);
    return data;
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  logout() {
    this.removeToken();
  }

  // Products endpoints
  async getProducts(category = null) {
    const params = category && category !== 'All' ? `?category=${category}` : '';
    return this.request(`/api/products/${params}`);
  }

  async getProduct(id) {
    return this.request(`/api/products/${id}`);
  }

  async getProductBySlug(slug) {
    return this.request(`/api/products/slug/${slug}`);
  }

  async createProduct(formData) {
    return this.request('/api/products/', {
      method: 'POST',
      body: formData, // FormData object
    });
  }

  async updateProduct(id, formData) {
    return this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: formData, // FormData object
    });
  }

  async deleteProduct(id) {
    return this.request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Services endpoints
  async getServices() {
    return this.request('/api/services/');
  }

  async getService(id) {
    return this.request(`/api/services/${id}`);
  }

  async createService(data) {
    return this.request('/api/services/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id, data) {
    return this.request(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id) {
    return this.request(`/api/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Hero Banners endpoints
  async getHeroBanners() {
    return this.request('/api/hero-banners/');
  }

  async getHeroBanner(id) {
    return this.request(`/api/hero-banners/${id}`);
  }

  async createHeroBanner(formData) {
    return this.request('/api/hero-banners/', {
      method: 'POST',
      body: formData, // FormData object
    });
  }

  async updateHeroBanner(id, formData) {
    return this.request(`/api/hero-banners/${id}`, {
      method: 'PUT',
      body: formData, // FormData object
    });
  }

  async deleteHeroBanner(id) {
    return this.request(`/api/hero-banners/${id}`, {
      method: 'DELETE',
    });
  }

  // About endpoints
  async getAboutImage() {
    return this.request('/api/about/');
  }

  async uploadAboutImage(formData) {
    return this.request('/api/about/', {
      method: 'POST',
      body: formData, // FormData object
    });
  }

  async deleteAboutImage() {
    return this.request('/api/about/', {
      method: 'DELETE',
    });
  }

  // Helper to build image URL
  getImageUrl(path) {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${this.baseURL}/uploads${path}`;
  }

  // About endpoints
  async getAbout() {
    return this.request('/api/about/');
  }

  async createAbout(formData) {
    return this.request('/api/about/', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async updateAbout(id, formData) {
    return this.request(`/api/about/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Orders endpoints
  async createOrder(orderData) {
    return this.request('/api/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(status = null) {
    const params = status ? `?status=${status}` : '';
    return this.request(`/api/orders/${params}`);
  }

  async getOrder(orderId) {
    return this.request(`/api/orders/${orderId}`);
  }

  async trackOrder(orderNumber) {
    return this.request(`/api/orders/track/${orderNumber}`);
  }

  async updateOrder(orderId, updateData) {
    return this.request(`/api/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteOrder(orderId) {
    return this.request(`/api/orders/${orderId}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
const api = new APIClient();
export default api;

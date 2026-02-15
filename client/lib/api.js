// API utility functions for fetching data from FastAPI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Hero Banners
export async function getHeroBanners() {
  const res = await fetch(`${API_BASE_URL}/api/hero-banners`, { 
    next: { revalidate: 1 }
  });
  if (!res.ok) return [];
  return res.json();
}

// About Section
export async function getAboutSection() {
  const res = await fetch(`${API_BASE_URL}/api/about`, { 
    next: { revalidate: 60 }
  });
  if (!res.ok) return null;
  return res.json();
}

// Services
export async function getServices() {
  const res = await fetch(`${API_BASE_URL}/api/services`, { 
    next: { revalidate: 60 }
  });
  if (!res.ok) return [];
  return res.json();
}

// Shop Section
export async function getShopSection() {
  const res = await fetch(`${API_BASE_URL}/api/shop`, { 
    next: { revalidate: 60 }
  });
  if (!res.ok) return null;
  return res.json();
}

// News
export async function getLatestNews(limit = 6, offset = 0) {
  const res = await fetch(`${API_BASE_URL}/api/news/latest?limit=${limit}&offset=${offset}`, { 
    next: { revalidate: 60 }
  });
  if (!res.ok) return [];
  return res.json();
}

// Admin API functions (client-side only)
export class AdminAPI {
  constructor(token) {
    this.token = token;
    this.headers = {
      'Authorization': `Bearer ${token}`,
    };
  }

  async login(username, password) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  }

  async verifyAuth() {
    const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      headers: this.headers,
    });
    return res.ok;
  }

  // Hero Banners
  async getHeroBanners() {
    const res = await fetch(`${API_BASE_URL}/api/admin/hero-banners`, {
      headers: this.headers,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch hero banners');
    return res.json();
  }

  async createHeroBanner(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin/hero-banners`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to create hero banner');
    return res.json();
  }

  async updateHeroBanner(id, data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin/hero-banners/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to update hero banner');
    return res.json();
  }

  async deleteHeroBanner(id) {
    const res = await fetch(`${API_BASE_URL}/api/admin/hero-banners/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to delete hero banner');
    return res.json();
  }

  // Services
  async getServices() {
    const res = await fetch(`${API_BASE_URL}/api/admin/services`, {
      headers: this.headers,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  }

  async createService(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin/services`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to create service');
    return res.json();
  }

  async updateService(id, data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin/services/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json();
  }

  async deleteService(id) {
    const res = await fetch(`${API_BASE_URL}/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return res.json();
  }

  // News
  async getNews() {
    const res = await fetch(`${API_BASE_URL}/api/admin/news`, {
      headers: this.headers,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch news');
    return res.json();
  }

  async createNews(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin/news`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to create news');
    return res.json();
  }

  async updateNews(id, data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin/news/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to update news');
    return res.json();
  }

  async deleteNews(id) {
    const res = await fetch(`${API_BASE_URL}/api/admin/news/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to delete news');
    return res.json();
  }

  // About Section
  async updateAbout(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin/about`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to update about section');
    return res.json();
  }

  // Shop Section
  async updateShop(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin/shop`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to update shop section');
    return res.json();
  }
}
/**
 * Services layer - abstracts all API communication.
 * Currently uses local constants as mock data source.
 * Replace base URL with your backend API (Neon PostgreSQL via serverless functions).
 */

import axios from 'axios';
import { CATEGORIES } from '../constants/categories';

const API_BASE_URL = 'http://localhost:8000/api/products/';

/**
 * Products service
 */
export const productService = {

  // Fetch all products
  async getAll() {
    const res = await axios.get(API_BASE_URL);
    return res.data;
  },

  // Fetch product by slug
  async getBySlug(slug) {
    const res = await axios.get(`${API_BASE_URL}${slug}/`);
    return res.data;
  },

  // Fetch products by category
  async getByCategory(category) {
    const res = await axios.get(
      `${API_BASE_URL}?category=${category}`
    );
    return res.data;
  },

  // Fetch best sellers
  async getBestSellers() {
    const res = await axios.get(
      `${API_BASE_URL}?best_seller=true`
    );
    return res.data;
  },
};
/**
 * Categories service
 */
export const categoryService = {
  async getAll() {
    if (!API_BASE_URL) return CATEGORIES;
    const res = await fetch(`${API_BASE_URL}/api/categories`);
    return res.json();
  },
};

/**
 * Cart service - for backend sync when authenticated
 */
export const cartService = {
  async sync(userId, items) {
    if (!API_BASE_URL) return null;
    const res = await fetch(`${API_BASE_URL}/api/cart/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items }),
    });
    return res.json();
  },

  async getCart(userId) {
    if (!API_BASE_URL) return null;
    const res = await fetch(`${API_BASE_URL}/api/cart?userId=${userId}`);
    return res.json();
  },
};

/**
 * Orders service
 */
export const orderService = {

  async create(orderData) {

    const response = await fetch("/api/order", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(orderData),
    });


    const result = await response.json();


    if (!result.success) {
      throw new Error(result.message);
    }


    return result.order;
  }

};

/**
 * Contact messages service
 */
export const contactService = {
  async sendMessage(messageData) {
    if (!API_BASE_URL) return { success: true };
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    });
    return res.json();
  },
};

/**
 * Reviews service
 */
export const reviewService = {
  async getByProduct(productId) {
    if (!API_BASE_URL) return [];
    const res = await fetch(`${API_BASE_URL}/api/reviews?productId=${productId}`);
    return res.json();
  },

  async create(reviewData) {
    if (!API_BASE_URL) return { id: Date.now(), ...reviewData };
    const res = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    return res.json();
  },
};
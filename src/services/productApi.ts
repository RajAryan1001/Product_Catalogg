import axios from 'axios';
import type { Product } from '../types/product';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};
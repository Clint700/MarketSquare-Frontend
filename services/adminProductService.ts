import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://marketsquare-backend-6yy4.onrender.com/api";

// Helper function to get authorization headers
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return {
    Authorization: `Bearer ${token}`,
    Role: "admin",
  };
};

// Fetch all products with optional filters (pagination, item_name, category, price range, etc.)
export const fetchProducts = async (filters = {}) => {
  const headers = await getAuthHeaders();
  const params = new URLSearchParams(filters);
  return axios.get(`${API_URL}/product?${params}`, { headers });
};

// Fetch a single product by its ID
export const fetchProductById = async (item_id: number) => {
  const headers = await getAuthHeaders();
  return axios.get(`${API_URL}/product/${item_id}`, { headers });
};

// Create a new product (Admin-only)
export const createProduct = async (productData: {
  user_id: number;
  img_url: string;
  price: string;
  stock: number;
  category: string;
  item_name: string;
  item_description: string;
  dimensions: { length: string; width: string; height: string };
  rating: number;
}) => {
  const headers = await getAuthHeaders();
  return axios.post(`${API_URL}/product`, productData, { headers });
};

// Update a product (Admin-only)
export const updateProduct = async (
  item_id: number,
  productData: {
    img_url?: string;
    price?: string;
    stock?: number;
    category?: string;
    item_name?: string;
    item_description?: string;
    dimensions?: { length?: string; width?: string; height?: string };
    rating?: number;
  }
) => {
  const headers = await getAuthHeaders();
  return axios.patch(`${API_URL}/product/${item_id}`, productData, { headers });
};

// Delete a product by its user ID and item ID (Admin-only)
export const deleteProduct = async (user_id: number, item_id: number) => {
  const headers = await getAuthHeaders();
  return axios.delete(`${API_URL}/product/${user_id}/${item_id}`, { headers });
};

// Filter products by name
export const filterProductsByName = async (itemName: string) => {
  const headers = await getAuthHeaders();
  return axios.get(`${API_URL}/product?item_name=${itemName}`, { headers });
};

// Filter products by category and name
export const filterProductsByCategoryAndName = async (
  category: string,
  itemName: string
) => {
  const headers = await getAuthHeaders();
  return axios.get(
    `${API_URL}/product?category=${category}&item_name=${itemName}`,
    { headers }
  );
};

// Filter products by name and price range
export const filterProductsByNameAndPrice = async (
  itemName: string,
  priceMin: number,
  priceMax: number
) => {
  const headers = await getAuthHeaders();
  return axios.get(
    `${API_URL}/product?item_name=${itemName}&price_min=${priceMin}&price_max=${priceMax}`,
    { headers }
  );
};
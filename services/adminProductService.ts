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

// Fetch all products with optional filters
export const fetchProducts = async (filters = {}) => {
  const headers = await getAuthHeaders();
  const params = new URLSearchParams(filters);
  return axios.get(`${API_URL}/product?${params}`, { headers });
};

// Fetch a single product by ID
export const fetchProductById = async (item_id: any) => {
  const headers = await getAuthHeaders();
  return axios.get(`${API_URL}/product/${item_id}`, { headers });
};

// Create a new product (admin only)
export const createProduct = async (productData: any) => {
  const headers = await getAuthHeaders();
  return axios.post(`${API_URL}/product`, productData, { headers });
};

// Update product details (admin only)
export const updateProduct = async (item_id: any, productData: any) => {
  const headers = await getAuthHeaders();
  return axios.patch(`${API_URL}/product/${item_id}`, productData, { headers });
};

// Delete a product by user and product ID (admin only)
export const deleteProduct = async (user_id: any, item_id: any) => {
  const headers = await getAuthHeaders();
  return axios.delete(`${API_URL}/product/${user_id}/${item_id}`, { headers });
};

// Filter products by name
export const filterProductsByName = async (itemName: any) => {
  const headers = await getAuthHeaders();
  return axios.get(`${API_URL}/product?item_name=${itemName}`, { headers });
};

// Filter products by category and name
export const filterProductsByCategoryAndName = async (category: any, itemName: any) => {
  const headers = await getAuthHeaders();
  return axios.get(
    `${API_URL}/product?category=${category}&item_name=${itemName}`,
    { headers }
  );
};

// Filter products by name and price range
export const filterProductsByNameAndPrice = async (itemName: any, priceMin: any, priceMax: any) => {
  const headers = await getAuthHeaders();
  return axios.get(
    `${API_URL}/product?item_name=${itemName}&price_min=${priceMin}&price_max=${priceMax}`,
    { headers }
  );
};
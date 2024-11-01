import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://marketsquare-backend-6yy4.onrender.com/api";

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("authToken");
  const role = await AsyncStorage.getItem("userRole");
  return {
    Authorization: `Bearer ${token}`,
    Role: role || "user",
  };
};

export const login = (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const register = (username: string, password: string, email: string) => {
  return axios.post(`${API_URL}/auth/register`, { username, password, email });
};

export const getProtectedData = async () => {
  const headers = await getAuthHeaders();
  return axios.get(`${API_URL}/protected-endpoint`, { headers });
};

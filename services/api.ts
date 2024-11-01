import axios from "axios";
import { API_URL } from "../constants/Urls";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const get = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const post = async (url: string, data: any) => {
  const response = await api.post(url, data);
  return response.data;
};

export default api;

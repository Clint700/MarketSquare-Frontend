import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://marketsquare-backend-6yy4.onrender.com/api";

export const fetchAdminOrders = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return axios.get(`${API_URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: "admin",
    },
  });
};

export const fetchOrderById = async (order_id: number) => {
  const token = await AsyncStorage.getItem("authToken");
  return axios.get(`${API_URL}/admin/orders/${order_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: "admin",
    },
  });
}

export const updateOrderStatus = async (
  order_id: number,
  newStatus: string
) => {
  const token = await AsyncStorage.getItem("authToken");

  return axios.patch(
    `${API_URL}/admin/orders/${order_id}`,
    { status: newStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Role: "admin",
      },
    }
  );
};

export const fetchAllProducts = async (token: string, role: string) => {
  const headers = { Authorization: `Bearer ${token}`, role };
  return axios.get(`${API_URL}/admin/products`, { headers });
};

export const fetchAllCustomers = async (token: string, role: string) => {
  const headers = { Authorization: `Bearer ${token}`, role };
  return axios.get(`${API_URL}/admin/users`, { headers });
};

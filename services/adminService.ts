import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://marketsquare-backend-6yy4.onrender.com/api";

export const fetchAdminOrders = async (status?: string) => {
  const token = await AsyncStorage.getItem("authToken");
  const queryParams = status ? `?status=${status}` : "";
  return axios.get(`${API_URL}/admin/orders${queryParams}`, {
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
};

export const updateOrderStatus = async (
  order_id: number,
  updatedFields: {
    status: string;
    payment_status: string;
    shipping_cost: number;
    updated_at: Date;
  }
) => {
  const token = await AsyncStorage.getItem("authToken");

  return axios.patch(`${API_URL}/admin/orders/${order_id}`, updatedFields, {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: "admin",
    },
  });
};

export const fetchAllProducts = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return axios.get(`${API_URL}/admin/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: "admin",
    },
  });
};

export const fetchAllCustomers = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return axios.get(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: "admin",
    },
  });
};

export const fetchEndpoint = async () => {
  return axios.get(`${API_URL}`);
};

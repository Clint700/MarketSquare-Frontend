import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { updateOrderStatus } from "../../../services/adminService";
import { fetchOrderById } from "../../../services/adminService";
import { RootStackParamList } from "../../../navigation/MainTabNavigator";

type OrderDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "OrderDetails"
>;

interface OrderDetailsScreenProps {
  route: OrderDetailsScreenRouteProp;
}

const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({ route }) => {
  const { order_id } = route.params;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetchOrderById(Number(order_id));
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      Alert.alert("Error", "Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      const response = await updateOrderStatus(Number(order_id), newStatus);
      setOrder(response.data);
      Alert.alert("Success", "Order status updated successfully.");
    } catch (error) {
      console.error("Error updating order status:", error);
      Alert.alert("Error", "Failed to update order status.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#007BFF" />
    );
  }

  if (!order) {
    return <Text style={styles.errorText}>Order not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.detail}>Order ID: {order.order_id}</Text>
      <Text style={styles.detail}>User ID: {order.user_id}</Text>
      <Text style={styles.detail}>Total Amount: ${order.total_amount}</Text>
      <Text style={styles.detail}>Status: {order.status}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter new status"
        value={newStatus}
        onChangeText={setNewStatus}
      />
      <Button title="Update Status" onPress={handleUpdateStatus} />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

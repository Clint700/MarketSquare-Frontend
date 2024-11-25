import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { updateOrderStatus, fetchOrderById } from "../../../services/adminService";
import { RootStackParamList } from "../../../navigation/MainTabNavigator";

type OrderDetailsScreenRouteProp = RouteProp<RootStackParamList, "OrderDetails">;

interface OrderDetailsScreenProps {
  route: OrderDetailsScreenRouteProp;
}

const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({ route }) => {
  const { order_id } = route.params;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");

  const statusOptions = ["Received", "Pending", "Shipped", "Cancelled"];

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetchOrderById(Number(order_id));
      setOrder(response.data);
      setNewStatus(response.data.status);
    } catch (error) {
      console.error("Error fetching order details:", error);
      Alert.alert("Error", "Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) {
      Alert.alert("Error", "Please select a status before updating.");
      return;
    }
    setUpdating(true);
    try {
      await updateOrderStatus(Number(order_id), newStatus);
      Alert.alert("Success", "Order status updated successfully.");
      fetchOrderDetails();
    } catch (error) {
      console.error("Error updating order status:", error);
      Alert.alert("Error", "Failed to update order status.");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Received":
        return "#4682B4";
      case "Pending":
        return "#FFB300";
      case "Shipped":
        return "#4CAF50";
      case "Cancelled":
        return "#FF6347";
      default:
        return "#333";
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#4682B4" />;
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
      <Text style={styles.detail}>
        Status: <Text style={[styles.status, { color: getStatusColor(order.status) }]}>{order.status}</Text>
      </Text>

      <Text style={styles.label}>Update Status:</Text>
      <View style={styles.statusContainer}>
        {statusOptions.map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusOption,
              newStatus === status && { backgroundColor: getStatusColor(status) },
            ]}
            onPress={() => setNewStatus(status)}
          >
            <Text style={[styles.statusText, newStatus === status && { color: "#fff" }]}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, updating && styles.buttonDisabled]}
        onPress={handleUpdateStatus}
        disabled={updating}
      >
        <Text style={styles.buttonText}>{updating ? "Updating..." : "Update Status"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  detail: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  status: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  statusOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginRight: 10,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#4682B4",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
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
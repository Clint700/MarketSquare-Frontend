import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Order {
  order_id: number;
  full_name: string;
  total_amount: number;
  shipping_cost: number;
  payment_status: string;
  status: string;
}

interface AdminOrderCardProps {
  order: Order;
  onPress: () => void;
}

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order, onPress }) => {
  const getStatusStyle = () => {
    switch (order.status.toLowerCase()) {
      case "processing":
        return styles.processing;
      case "shipped":
        return styles.shipped;
      case "cancelled":
        return styles.cancelled;
      case "completed":
        return styles.completed;
      default:
        return styles.processing;
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderID}>{order.full_name}</Text>
        <Text style={[styles.status, getStatusStyle()]}>{order.status}</Text>
      </View>
      <Text style={styles.text}>Total Amount: £{order.total_amount}</Text>
      <Text style={styles.text}>
        Shipping Cost: £{order.shipping_cost.toFixed(2)}
      </Text>
      <Text style={styles.text}>Payment Status: {order.payment_status}</Text>
    </TouchableOpacity>
  );
};

export default AdminOrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderID: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
  },
  processing: { backgroundColor: "#2196f3" },
  shipped: { backgroundColor: "#4caf50" },
  cancelled: { backgroundColor: "#f44336" },
  completed: { backgroundColor: "#8e44ad" },
  text: { fontSize: 16, color: "#555", marginBottom: 5 },
});

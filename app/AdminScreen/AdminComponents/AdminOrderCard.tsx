import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/MainTabNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type AdminOrderCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OrderDetails"
>;

interface Order {
  order_id: string;
  user_id: string;
  total_amount: string;
  status: string;
}

interface AdminOrderCardProps {
  order: Order;
  onPress: () => void;
}

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order, onPress }) => {
  const navigation = useNavigation<AdminOrderCardNavigationProp>();

  const getStatusStyle = () => {
    switch (order.status.toLowerCase()) {
      case "received":
        return styles.received;
      case "pending":
        return styles.pending;
      case "shipped":
        return styles.shipped;
      case "cancelled":
        return styles.cancelled;
      default:
        return styles.pending;
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderID}>Order {order.order_id}</Text>
        <Text style={[styles.status, getStatusStyle()]}>{order.status}</Text>
      </View>
      <Text style={styles.text}>User ID: {order.user_id}</Text>
      <Text style={styles.text}>Total Amount: £{order.total_amount}</Text>
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
  received: {
    backgroundColor: "#2196f3",
  },
  pending: {
    backgroundColor: "#ff9800",
  },
  shipped: {
    backgroundColor: "#4caf50",
  },
  cancelled: {
    backgroundColor: "#f44336",
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});
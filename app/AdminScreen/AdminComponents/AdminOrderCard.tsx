import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/MainTabNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type AdminOrderCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OrderDetails"
>;

interface AdminOrderCardProps {
  order: {
    order_id: string;
    user_id: string;
    total_amount: string;
    status: string;
  };
}

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order }) => {
  const navigation = useNavigation<AdminOrderCardNavigationProp>();

  const handlePress = () => {
    navigation.navigate("OrderDetails", { order_id: order.order_id });
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <Text style={styles.text}>Order ID: {order.order_id}</Text>
      <Text style={styles.text}>User ID: {order.user_id}</Text>
      <Text style={styles.text}>Total Amount: ${order.total_amount}</Text>
      <Text style={styles.text}>Status: {order.status}</Text>
    </TouchableOpacity>
  );
};

export default AdminOrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

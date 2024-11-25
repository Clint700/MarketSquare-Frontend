import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
} from "react-native";
import AdminOrderCard from "../AdminScreen/AdminComponents/AdminOrderCard";
import { fetchAdminOrders } from "../../services/adminService";
import { useAuth } from "../../contexts/AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/MainTabNavigator";

type AdminOrdersScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminOrders"
>;

const AdminOrderScreen: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<AdminOrdersScreenNavigationProp>();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAdminOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Alert.alert("Error", "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchOrders();
    } else {
      Alert.alert("Access Denied", "Only admins can access this screen.");
    }
  }, [user?.role, fetchOrders]);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [fetchOrders])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4682B4" />
        <Text style={styles.loadingText}>Loading Orders...</Text>
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Orders Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={({ item }) => (
          <AdminOrderCard
            order={item}
            onPress={() => navigation.navigate("OrderDetails", { order_id: item.order_id })}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AdminOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4f0",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
});
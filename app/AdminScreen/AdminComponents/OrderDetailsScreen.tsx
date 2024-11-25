import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import {
  updateOrderStatus,
  fetchOrderById,
} from "../../../services/adminService";
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
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [newPaymentStatus, setNewPaymentStatus] = useState<string>("");
  const [newShippingCost, setNewShippingCost] = useState<string>("");

  const statusOptions = ["Processing", "Shipped", "Cancelled", "Completed"];
  const paymentStatusOptions = ["Paid", "Unpaid"];

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetchOrderById(Number(order_id));
      setOrder(response.data);
      setNewStatus(response.data.status);
      setNewPaymentStatus(response.data.payment_status);
      setNewShippingCost(response.data.shipping_cost.toString());
    } catch (error) {
      console.error("Error fetching order details:", error);
      Alert.alert("Error", "Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!newStatus || !newPaymentStatus || !newShippingCost) {
      Alert.alert("Error", "All fields are required to update.");
      return;
    }
    setUpdating(true);
    try {
      await updateOrderStatus(Number(order_id), {
        status: newStatus,
        payment_status: newPaymentStatus,
        shipping_cost: parseFloat(newShippingCost),
        updated_at: new Date(),
      });
      Alert.alert("Success", "Order updated successfully.");
      fetchOrderDetails();
    } catch (error) {
      console.error("Error updating order:", error);
      Alert.alert("Error", "Failed to update order.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  if (!order) {
    return <Text style={styles.errorText}>Order not found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.detailTitle}>Order Details</Text>
        <Text style={styles.detail}>Customer: {order.full_name}</Text>
        <Text style={styles.detail}>
          Total Amount: £{order.total_amount.toFixed(2)}
        </Text>
        <Text style={styles.detail}>
          Shipping Cost: £{order.shipping_cost.toFixed(2)}
        </Text>
        <Text style={styles.detail}>
          Payment Status: {order.payment_status}
        </Text>
        <Text style={styles.detail}>
          Status: <Text style={styles.status}>{order.status}</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.detailTitle}>Shipping Address</Text>
        <Text style={styles.address}>
          {JSON.parse(order.shipping_address).street}
        </Text>
        <Text style={styles.address}>
          {JSON.parse(order.shipping_address).city}
        </Text>
        <Text style={styles.address}>
          {JSON.parse(order.shipping_address).postcode}
        </Text>
        <Text style={styles.address}>
          {JSON.parse(order.shipping_address).country}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.detailTitle}>Billing Address</Text>
        <Text style={styles.address}>
          {JSON.parse(order.billing_address).street}
        </Text>
        <Text style={styles.address}>
          {JSON.parse(order.billing_address).city}
        </Text>
        <Text style={styles.address}>
          {JSON.parse(order.billing_address).postcode}
        </Text>
        <Text style={styles.address}>
          {JSON.parse(order.billing_address).country}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.detailTitle}>Update Order</Text>
        <Text style={styles.label}>Status</Text>
        <View style={styles.optionsContainer}>
          {statusOptions.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.option,
                newStatus === status && styles.optionSelected,
              ]}
              onPress={() => setNewStatus(status)}
            >
              <Text style={styles.optionText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Payment Status</Text>
        <View style={styles.optionsContainer}>
          {paymentStatusOptions.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.option,
                newPaymentStatus === status && styles.optionSelected,
              ]}
              onPress={() => setNewPaymentStatus(status)}
            >
              <Text style={styles.optionText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Shipping Cost</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={newShippingCost}
          onChangeText={setNewShippingCost}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, updating && styles.buttonDisabled]}
        onPress={handleUpdateStatus}
        disabled={updating}
      >
        <Text style={styles.buttonText}>
          {updating ? "Updating..." : "Update Order"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4f0",
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginTop: 10,
    marginBottom: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E90FF",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#333",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  address: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 12,
    padding: 5,
    textAlign: "center",
  },
  statusProcessing: { backgroundColor: "#FF9800", color: "#FFF" },
  statusShipped: { backgroundColor: "#4CAF50", color: "#FFF" },
  statusCancelled: { backgroundColor: "#F44336", color: "#FFF" },
  statusCompleted: { backgroundColor: "#2196F3", color: "#FFF" },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  option: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: "#1E90FF",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#CCC",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

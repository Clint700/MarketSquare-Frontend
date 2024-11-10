import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import HomeScreen from "../app/customerScreen/HomeScreen";
import ProfileScreen from "../app/customerScreen/ProfileScreen";
import OrdersScreen from "../app/customerScreen/OrderScreen";
import ProductsScreen from "../app/customerScreen/ProductScreen";
import CartScreen from "../app/customerScreen/CartScreen";
import AdminDashboard from "../app/AdminScreen/AdminDashboard";
import ManageUsersScreen from "../app/AdminScreen/ManageUsersScreen";
import AdminOrdersScreen from "../app/AdminScreen/AdminOrdersScreen";
import OrderDetailsScreen from "../app/AdminScreen/AdminComponents/OrderDetailsScreen";

export type RootStackParamList = {
  AdminDashboard: undefined;
  ManageUsers: undefined;
  AdminOrders: undefined;
  OrderDetails: { order_id: string };
  Profile: undefined;
  Home: undefined;
  Products: undefined;
  Cart: undefined;
  CustomerOrders: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

// Admin Stack
function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: "Dashboard" }} />
      <Stack.Screen name="ManageUsers" component={ManageUsersScreen} options={{ title: "Manage Users" }} />
      <Stack.Screen name="AdminOrders" component={AdminOrdersScreen} options={{ title: "Orders" }} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: "Order Details" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Stack.Navigator>
  );
}

// Customer Stack
function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Stack.Screen name="Products" component={ProductsScreen} options={{ title: "Products" }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Cart" }} />
      <Stack.Screen name="CustomerOrders" component={OrdersScreen} options={{ title: "Orders" }} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: "Order Details" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  const { user } = useAuth();

  return (
    <Tab.Navigator>
      {user?.role === "admin" ? (
        <>
          <Tab.Screen name="Admin" component={AdminStack} options={{ title: "Dashboard" }} />
          <Tab.Screen name="AdminOrders" component={AdminOrdersScreen} options={{ title: "Orders" }} />
        </>
      ) : (
        <Tab.Screen name="Customer" component={CustomerStack} options={{ title: "Home" }} />
      )}
    </Tab.Navigator>
  );
}
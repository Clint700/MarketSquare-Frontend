import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../app/customerScreen/HomeScreen";
import ProfileScreen from "../app/customerScreen/ProfileScreen";
import OrdersScreen from "../app/customerScreen/OrderScreen";
import ProductsScreen from "../app/customerScreen/ProductScreen";
import CartScreen from "../app/customerScreen/CartScreen";
import AdminDashboard from "../app/AdminScreen/AdminDashboard";
import ManageUsersScreen from "../app/AdminScreen/ManageUsersScreen";
import AdminOrdersScreen from "../app/AdminScreen/AdminOrdersScreen";
import OrderDetailsScreen from "../app/AdminScreen/AdminComponents/OrderDetailsScreen";
import AdminProductsScreen from "../app/AdminScreen/AdminProductsScreen";
import AdminProductDetailsScreen from "../app/AdminScreen/AdminComponents/AdminProductDetailsScreen";
import EndpointScreen from "../app/AdminScreen/endpointScreen";

export type RootStackParamList = {
  AdminDashboard: undefined;
  ManageUsers: undefined;
  AdminOrders: undefined;
  OrderDetails: { order_id: string };
  Profile: undefined;
  Home: undefined;
  Cart: undefined;
  CustomerOrders: undefined;
  EndpointScreen: undefined;
  AdminProducts: undefined;
  AdminProductDetails: {
    product_id: number;
    onProductDelete: (deletedProductId: number) => void;
  };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ManageUsers"
        component={ManageUsersScreen}
        options={{ title: "Manage Users" }}
      />
      <Stack.Screen
        name="AdminOrders"
        component={AdminOrdersScreen}
        options={{ title: "Orders" }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: "Order Details" }}
      />
      <Stack.Screen
        name="AdminProducts"
        component={AdminProductsScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="AdminProductDetails"
        component={AdminProductDetailsScreen}
        options={{ title: "Product Details" }}
      />
      <Stack.Screen
        name="EndpointScreen"
        component={EndpointScreen}
        options={{ title: "Endpoints" }}
      />
    </Stack.Navigator>
  );
}

function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="AdminProducts"
        component={ProductsScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
      <Stack.Screen
        name="CustomerOrders"
        component={OrdersScreen}
        options={{ title: "Orders" }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: "Order Details" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Admin") iconName = "grid-outline";
          else if (
            route.name === "AdminOrders" ||
            route.name === "CustomerOrders"
          )
            iconName = "list-outline";
          else if (route.name === "AdminProducts") iconName = "cube-outline";
          else if (route.name === "ManageUsers") iconName = "people-outline";
          else if (route.name === "Customer") iconName = "home-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Cart") iconName = "cart-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#444",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: { backgroundColor: "#f5f5f5", borderTopWidth: 0 },
        headerShown: true,
      })}
    >
      {user?.role === "admin" ? (
        <>
          <Tab.Screen
            name="Admin"
            component={AdminStack}
            options={{ title: "Dashboard" }}
          />
          <Tab.Screen
            name="AdminOrders"
            component={AdminOrdersScreen}
            options={{ title: "Orders" }}
          />
          <Tab.Screen
            name="AdminProducts"
            component={AdminProductsScreen}
            options={{ title: "Products" }}
          />
          <Tab.Screen
            name="ManageUsers"
            component={ManageUsersScreen}
            options={{ title: "Manage Users" }}
          />
          <Tab.Screen
            name="EndpointScreen"
            component={EndpointScreen}
            options={{ title: "Endpoints" }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Customer"
          component={CustomerStack}
          options={{ title: "Home" }}
        />
      )}
    </Tab.Navigator>
  );
}
